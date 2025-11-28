import { authRouter } from "@/modules/auth/server/procedures";
import { categoriesRouter } from "@/modules/categories/server/procedures";
import { productsRouter } from "@/modules/products/server/procedures";
import { tagsRouter } from "@/modules/tags/server/procedures";
import { tenantsRouter } from "@/modules/tenants/server/procedures";

import { createTRPCRouter } from "../init";

/**
 * App Router
 * @description The root router for this server.
 * @property {AuthRouter} auth - The auth router
 * @property {CategoriesRouter} categories - The categories router
 * @property {ProductsRouter} products - The products router
 * @property {TagsRouter} tags - The tags router
 * @property {TenantsRouter} tenants - The tenants router
 * @returns {TRPCRouter} The root router
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  categories: categoriesRouter,
  products: productsRouter,
  tags: tagsRouter,
  tenants: tenantsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
