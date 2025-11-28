import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";

/**
 * @description Render the subcategory product listing page and prefetch products for client hydration.
 * @param params - Route parameters; only `params.subcategory` (the subcategory URL segment) is used for fetching and rendering
 * @param searchParams - Search parameters; used for fetching and rendering
 * @returns A JSX element that hydrates prefetched product data and renders the product list for the `subcategory`
 */
export default async function Subcategory({
  params,
  searchParams,
}: PageProps<"/[category]/[subcategory]">) {
  const { subcategory } = await params;

  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category: subcategory, ...filters })
  );

  return (
    <HydrateClient>
      <ProductListView category={subcategory} />
    </HydrateClient>
  );
}
