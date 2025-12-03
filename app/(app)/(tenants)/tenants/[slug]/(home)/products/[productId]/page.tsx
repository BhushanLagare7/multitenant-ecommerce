import { JSX, Suspense } from "react";

import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

import {
  ProductView,
  ProductViewSkeleton,
} from "@/modules/products/ui/views/product-view";

/**
 * @description Render the product page for the current product, hydrating client state and prefetching the tenant. Hydrates the query client, triggers a background prefetch for tenant data using `params.slug`, and renders a `ProductView` for that tenant and product.
 * @param params - Route parameters object; `params.slug` is the tenant slug and `params.productId` is the URL segment identifying the product
 * @returns {Promise<JSX.Element>} A Promise that resolves to a JSX element that hydrates client state and renders the product `ProductView`
 */
export default async function ProductPage({
  params,
}: PageProps<"/tenants/[slug]/products/[productId]">): Promise<JSX.Element> {
  const { slug, productId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({ slug }));

  return (
    <HydrateClient>
      <Suspense fallback={<ProductViewSkeleton />}>
        <ProductView productId={productId} tenantSlug={slug} />
      </Suspense>
    </HydrateClient>
  );
}
