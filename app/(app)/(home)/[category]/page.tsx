import { JSX } from "react";

import { DEFAULT_LIMIT } from "@/constants";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";

/**
 * @description Render the product-list page for the current category, hydrating client state and infinite prefetching category products to  `DEFAULT_LIMIT`. Hydrates the query client, triggers a background prefetch for products in `params.category`, and renders a `ProductListView` for that category.
 * @param params - Route parameters object; `params.category` is the URL segment identifying the category
 * @param searchParams - Search parameters object; `searchParams` is the URL search parameters
 * @returns {Promise<JSX.Element>} A Promise that resolves to a JSX element that hydrates client state and renders the category `ProductListView`
 */
export default async function Category({
  params,
  searchParams,
}: PageProps<"/[category]">): Promise<JSX.Element> {
  const { category } = await params;

  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      category,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrateClient>
      <ProductListView category={category} />
    </HydrateClient>
  );
}
