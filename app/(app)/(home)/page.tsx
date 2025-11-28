import { JSX } from "react";

import { DEFAULT_LIMIT } from "@/constants";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";

/**
 * @description Render the product-list page, hydrating client state and infinite prefetching products to  `DEFAULT_LIMIT`. Hydrates the query client, triggers a background prefetch for products, and renders a `ProductListView`.
 * @param searchParams - Search parameters object; `searchParams` is the URL search parameters
 * @returns {Promise<JSX.Element>} A Promise that resolves to a JSX element that hydrates client state and renders the `ProductListView`
 */
export default async function Home({
  searchParams,
}: PageProps<"/">): Promise<JSX.Element> {
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrateClient>
      <ProductListView />
    </HydrateClient>
  );
}
