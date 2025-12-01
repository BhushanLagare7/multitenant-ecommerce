import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

/**
 * @description Type for the output of the getOne procedure.
 * @type {ReviewGetOneOutput}
 */
export type ReviewGetOneOutput =
  inferRouterOutputs<AppRouter>["reviews"]["getOne"];
