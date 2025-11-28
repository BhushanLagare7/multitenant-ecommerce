import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

/**
 * Type for the output of the getMany query
 */
export type ProductsGetManyOutput =
  inferRouterOutputs<AppRouter>["products"]["getMany"];

/**
 * Type for a single product in the getMany query output
 */
export type ProductsGetManyOutputSingle =
  inferRouterOutputs<AppRouter>["products"]["getMany"]["docs"][number];
