import { z } from "zod";

import { DEFAULT_LIMIT } from "@/constants";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const tagsRouter = createTRPCRouter({
  /**
   * Get many tags
   * @description Gets many tags from the database.
   * @param {object} input - The input object
   * @param input.cursor - The cursor of the tags
   * @param input.limit - The limit of the tags
   * @returns {Promise<Tag[]>} The tags
   */
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
      })
    )
    .query(async ({ ctx, input }) => {
      const tags = await ctx.db.find({
        collection: "tags",
        page: input.cursor,
        limit: input.limit,
      });

      return tags;
    }),
});
