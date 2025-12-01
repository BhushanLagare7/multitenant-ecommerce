import { JSX } from "react";

import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

import { ProductView } from "@/modules/library/ui/views/product-view";

/**
 * Library product page
 * @description Library product page component prefetches the library product data, reviews and renders the library product view
 * @returns {Promise<JSX.Element>} A promise that resolves to a JSX element that renders the library product page
 */
export default async function LibraryProductPage({
  params,
}: PageProps<"/library/[productId]">): Promise<JSX.Element> {
  const { productId } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.library.getOne.queryOptions({ productId })
  );
  void queryClient.prefetchQuery(
    trpc.reviews.getOne.queryOptions({ productId })
  );

  return (
    <HydrateClient>
      <ProductView productId={productId} />
    </HydrateClient>
  );
}
