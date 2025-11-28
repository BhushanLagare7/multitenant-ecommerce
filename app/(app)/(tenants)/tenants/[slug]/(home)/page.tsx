import { JSX } from "react";

import { DEFAULT_LIMIT } from "@/constants";
import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";

/**
 * @description Render the product-list page, hydrating client state and infinite prefetching products to  `DEFAULT_LIMIT`. Hydrates the query client, triggers a background prefetch for products, and renders a `ProductListView`.
 * @param {object} params - The params object
 * @param params.slug - The slug of the tenant
 * @param {object} searchParams - The search parameters object used to load product filters
 * @returns {Promise<JSX.Element>} A Promise that resolves to a JSX element that hydrates client state and renders the `ProductListView`
 */
export default async function TenantPage({
  params,
  searchParams,
}: PageProps<"/tenants/[slug]">): Promise<JSX.Element> {
  const { slug } = await params;

  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      tenantSlug: slug,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrateClient>
      <ProductListView tenantSlug={slug} narrowView />
    </HydrateClient>
  );
}
