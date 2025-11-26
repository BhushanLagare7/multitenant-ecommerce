import { cache } from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";

import { appRouter } from "./routers/_app";
import { createTRPCContext } from "./init";
import { makeQueryClient } from "./query-client";

import "server-only"; // <-- ensure this file cannot be imported from the client
// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});

/**
 * Hydrates React Query state for the wrapped subtree using the request-scoped QueryClient.
 *
 * Wraps `children` in a `HydrationBoundary` seeded with the query client's dehydrated state
 * so server-provided query data is available to React Query on the client.
 *
 * @param props.children - The React node(s) to render inside the hydration boundary.
 * @returns A React element that wraps `children` in a `HydrationBoundary` populated with the query client's dehydrated state.
 */
export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}

export const caller = appRouter.createCaller(createTRPCContext);