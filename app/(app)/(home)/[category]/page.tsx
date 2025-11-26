import { Suspense } from "react";

import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";

/**
 * Render the product-list page for the current category, hydrating client state and prefetching category products.
 *
 * Hydrates the query client, triggers a background prefetch for products in `params.category`, and renders
 * a `ProductList` for that category inside a `Suspense` boundary with `ProductListSkeleton` as a fallback.
 *
 * @param params - Route parameters object; `params.category` is the URL segment identifying the category
 * @returns A JSX element that hydrates client state and renders the category `ProductList` with a `Suspense` fallback
 */
export default async function Category({ params }: PageProps<"/[category]">) {
  const { category } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category })
  );

  return (
    <HydrateClient>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList category={category} />
      </Suspense>
    </HydrateClient>
  );
}