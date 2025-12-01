import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const reviewsRouter = createTRPCRouter({
  /**
   * Get many reviews
   * @description Gets many reviews from the database.
   * @param {object} input - The input object
   * @param input.cursor - The cursor of the reviews
   * @param input.limit - The limit of the reviews
   * @returns {Promise<Review[]>} The reviews
   */
  getOne: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const product = await ctx.db.findByID({
        collection: "products",
        id: input.productId,
      });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      const reviewsData = await ctx.db.find({
        collection: "reviews",
        limit: 1,
        where: {
          and: [
            { product: { equals: product.id } },
            { user: { equals: ctx.session.user.id } },
          ],
        },
      });

      const review = reviewsData.docs[0];

      if (!review) {
        return null;
      }

      return review;
    }),
  /**
   * Create a review
   * @description Creates a review for a product.
   * @param {object} input - The input object
   * @param input.productId - The ID of the product
   * @param input.rating - The rating of the review
   * @param input.description - The description of the review
   * @returns {Promise<Review>} The created review
   */
  create: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        rating: z.number().min(1, "Rating is required").max(5),
        description: z.string().min(1, "Description is required"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.findByID({
        collection: "products",
        id: input.productId,
      });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      const existingReviewData = await ctx.db.find({
        collection: "reviews",
        where: {
          and: [
            { product: { equals: product.id } },
            { user: { equals: ctx.session.user.id } },
          ],
        },
      });

      if (existingReviewData.totalDocs > 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You have already reviewed this product",
        });
      }

      const review = await ctx.db.create({
        collection: "reviews",
        data: {
          product: product.id,
          user: ctx.session.user.id,
          rating: input.rating,
          description: input.description,
        },
      });

      return review;
    }),
  /**
   * Update a review
   * @description Updates a review for a product.
   * @param {object} input - The input object
   * @param input.reviewId - The ID of the review
   * @param input.rating - The rating of the review
   * @param input.description - The description of the review
   * @returns {Promise<Review>} The updated review
   */
  update: protectedProcedure
    .input(
      z.object({
        reviewId: z.string(),
        rating: z.number().min(1, "Rating is required").max(5),
        description: z.string().min(1, "Description is required"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const review = await ctx.db.findByID({
        collection: "reviews",
        depth: 0, // review.user will be the user ID
        id: input.reviewId,
      });

      if (!review) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Review not found",
        });
      }

      if (review.user !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to update this review",
        });
      }

      const updatedReview = await ctx.db.update({
        collection: "reviews",
        id: review.id,
        data: {
          rating: input.rating,
          description: input.description,
        },
      });

      return updatedReview;
    }),
});
