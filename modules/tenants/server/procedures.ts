import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const tenantsRouter = createTRPCRouter({
  /**
   * Get one tenant
   * @description Gets one tenant with populated image from the database.
   * @param {object} input - The input object
   * @param input.slug - The slug of the tenant
   * @returns {Promise<Tenant & { image: Media | null }>} The tenant with populated image

   */
  getOne: baseProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const tenantsData = await ctx.db.find({
        collection: "tenants",
        depth: 1, // "tenant.image" is a type of Media
        where: { slug: { equals: input.slug } },
        limit: 1,
        pagination: false,
      });

      const tenant = tenantsData.docs[0];

      if (!tenant) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Tenant not found" });
      }

      return tenant as Tenant & { image: Media | null };
    }),
});
