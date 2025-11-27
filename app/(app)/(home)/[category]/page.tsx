import { Suspense } from "react";

import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

import { loadProductFilters } from "@/modules/products/search-params";
import { ProductFilters } from "@/modules/products/ui/components/product-filters";
import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";
import { ProductSort } from "@/modules/products/ui/components/product-sort";

/**
 * Render the product-list page for the current category, hydrating client state and prefetching category products.
 *
 * Hydrates the query client, triggers a background prefetch for products in `params.category`, and renders
 * a `ProductList` for that category inside a `Suspense` boundary with `ProductListSkeleton` as a fallback.
 *
 * @param params - Route parameters object; `params.category` is the URL segment identifying the category
 * @returns A JSX element that hydrates client state and renders the category `ProductList` with a `Suspense` fallback
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
      <div className="flex flex-col gap-4 px-4 py-8 lg:px-12">
        <div className="flex flex-col gap-y-2 justify-between lg:flex-row lg:items-center lg:gap-y-0">
          <p className="text-2xl font-medium">Curated for you</p>
          <ProductSort />
        </div>
        <div className="grid grid-cols-1 gap-y-6 gap-x-12 lg:grid-cols-6 xl:grid-cols-8">
          <div className="lg:col-span-2 xl:col-span-2">
            <ProductFilters />
          </div>
          <div className="lg:col-span-4 xl:col-span-6">
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList category={category} />
            </Suspense>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
