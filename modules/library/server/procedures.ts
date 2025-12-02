import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { DEFAULT_LIMIT } from "@/constants";
import { Media, Tenant } from "@/payload-types";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

/**
 * @description A router that handles the library.
 * @function libraryRouter
 * @returns {object} An object containing procedures for library
 */
export const libraryRouter = createTRPCRouter({
  /**
   * @description Gets the product in the library
   * @function getOne
   * @returns {object} The product in the library
   */
  getOne: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const ordersData = await ctx.db.find({
        collection: "orders",
        limit: 1,
        pagination: false,
        where: {
          and: [
            { user: { equals: ctx.session.user.id } },
            { product: { equals: input.productId } },
          ],
        },
      });

      const order = ordersData.docs[0];

      if (!order) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Order not found" });
      }

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

      return product;
    }),
  /**
   * @description Gets the products in the library
   * @function getMany
   * @returns {object} An object containing the products in the library
   */
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
      })
    )
    .query(async ({ ctx, input }) => {
      const ordersData = await ctx.db.find({
        collection: "orders",
        depth: 0, // we want to just get ids, without populating any fields
        page: input.cursor,
        limit: input.limit,
        where: { user: { equals: ctx.session.user.id } },
      });

      const productIds = ordersData.docs.map((order) => order.product);

      const productsData = await ctx.db.find({
        collection: "products",
        pagination: false,
        where: { id: { in: productIds } },
      });

      const productsWithSummarizedReviews = await Promise.all(
        productsData.docs.map(async (product) => {
          const reviewsData = await ctx.db.find({
            collection: "reviews",
            pagination: false,
            where: {
              product: {
                equals: product.id,
              },
            },
          });

          return {
            ...product,
            reviewCount: reviewsData.totalDocs,
            reviewRating:
              reviewsData.totalDocs > 0
                ? reviewsData.docs.reduce(
                    (acc, review) => acc + review.rating,
                    0
                  ) / reviewsData.totalDocs
                : 0,
          };
        })
      );

      return {
        ...productsData,
        docs: productsWithSummarizedReviews.map((product) => ({
          ...product,
          image: product.image as Media | null,
          tenant: product.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
});
