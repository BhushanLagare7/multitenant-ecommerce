import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

/**
 * @description Router for categories procedures.
 * @type {TRPCRouter}
 * @property {function} getMany - Procedure to get all categories.
 */
export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.find({
      collection: "categories",
      depth: 1, // Populate Subcategories, subcategories.[0] wiil be a type of "Category"
      pagination: false,
      where: { parent: { exists: false } },
      sort: "name",
    });

    const formattedCategories = categories.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        // Because of "depth: 1" we are confident doc will be a type of "Category"
        ...(doc as Category),
      })),
    }));

    return formattedCategories;
  }),
});
