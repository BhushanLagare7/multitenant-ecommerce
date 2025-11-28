import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";

/**
 * @description Render the product-list page for the current category, hydrating client state and prefetching category products. Hydrates the query client, triggers a background prefetch for products in `params.category`, and renders a `ProductListView` for that category.
 * @param params - Route parameters object; `params.category` is the URL segment identifying the category
 * @returns A JSX element that hydrates client state and renders the category `ProductListView`
 */
export default async function Category({
  params,
  searchParams,
}: PageProps<"/[category]">) {
  const { category } = await params;

  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category, ...filters })
  );

  return (
    <HydrateClient>
      <ProductListView category={category} />
    </HydrateClient>
  );
}
