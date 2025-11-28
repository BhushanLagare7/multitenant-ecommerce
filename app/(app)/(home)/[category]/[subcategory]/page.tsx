import { JSX } from "react";

import { DEFAULT_LIMIT } from "@/constants";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";

/**
 * @description Render the subcategory product listing page and infinite prefetch products to `DEFAULT_LIMIT` for client hydration. Hydrates the query client, triggers a background prefetch for products in `params.subcategory`, and renders a `ProductListView` for that subcategory.
 * @param params - Route parameters; only `params.subcategory` (the subcategory URL segment) is used for fetching and rendering
 * @param searchParams - Search parameters; used for fetching and rendering
 * @returns {Promise<JSX.Element>} A Promise that resolves to a JSX element that hydrates prefetched product data and renders the product list for the `subcategory`
 */
export default async function Subcategory({
  params,
  searchParams,
}: PageProps<"/[category]/[subcategory]">): Promise<JSX.Element> {
  const { subcategory } = await params;

  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      category: subcategory,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrateClient>
      <ProductListView category={subcategory} />
    </HydrateClient>
  );
}
