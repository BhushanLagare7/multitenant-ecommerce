import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

/**
 * @description A router that handles the checkout.
 * @function checkoutRouter
 * @returns {object} An object containing procedures for checkout
 */
export const checkoutRouter = createTRPCRouter({
  /**
   * @description A procedure that returns the list of products.
   * @param {object} ctx - The context object
   * @param {object} input - The input object
   * @param {string[]} input.ids - The list of product IDs
   * @returns {object} An object containing the list of products
   */
  getProducts: baseProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .query(async ({ ctx, input }) => {
      const products = await ctx.db.find({
        collection: "products",
        depth: 2,
        where: { id: { in: input.ids } },
      });

      if (products.totalDocs !== input.ids.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      const totalPrice = products.docs.reduce((total, product) => {
        const price = Number(product.price);
        return total + (isNaN(price) ? 0 : price);
      }, 0);

      return {
        ...products,
        totalPrice,
        docs: products.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
});
