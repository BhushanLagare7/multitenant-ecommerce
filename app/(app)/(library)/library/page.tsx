import { JSX } from "react";

import { DEFAULT_LIMIT } from "@/constants";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

import { LibraryView } from "@/modules/library/ui/views/library-view";

export const dynamic = "force-dynamic";

/**
 * Library page
 * @description Library page component prefetches the library data and renders the library view
 * @returns {Promise<JSX.Element>} A promise that resolves to a JSX element that renders the library page
 */
export default async function LibraryPage(): Promise<JSX.Element> {
  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(
    trpc.library.getMany.infiniteQueryOptions({
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrateClient>
      <LibraryView />
    </HydrateClient>
  );
}
