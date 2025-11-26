import { Suspense } from "react";

import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";

/**
 * Render a page displaying the current category route segment.
 *
 * @param params - Object of route parameters; `params.category` is the URL segment for the category
 * @returns A JSX element containing "Category: " followed by the `category` value
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
