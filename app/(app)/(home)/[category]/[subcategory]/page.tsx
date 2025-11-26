import { Suspense } from "react";

import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";

/**
 * Render the subcategory product listing page and prefetch products for client hydration.
 *
 * @param params - Route parameters; only `params.subcategory` (the subcategory URL segment) is used for fetching and rendering
 * @returns A JSX element that hydrates prefetched product data and renders the product list for the `subcategory`
 */
export default async function Subcategory({
  params,
}: PageProps<"/[category]/[subcategory]">) {
  const { subcategory } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category: subcategory })
  );

  return (
    <HydrateClient>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList category={subcategory} />
      </Suspense>
    </HydrateClient>
  );
}