import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

/**
 * @description Type for the output of the getMany procedure.
 * @type {CategoriesGetManyOutput}
 */
export type CategoriesGetManyOutput =
  inferRouterOutputs<AppRouter>["categories"]["getMany"];
/**
 * @description Type for the output of the getMany procedure for a single category.
 * @type {CategoriesGetManyOutputSingle}
 */
export type CategoriesGetManyOutputSingle =
  inferRouterOutputs<AppRouter>["categories"]["getMany"][number];
