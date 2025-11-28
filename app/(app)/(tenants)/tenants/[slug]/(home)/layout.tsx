import { JSX, Suspense } from "react";

import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

import { Footer } from "@/modules/tenants/ui/components/footer";
import { Navbar, NavbarSkeleton } from "@/modules/tenants/ui/components/navbar";
/**
 * TenantLayout
 * @description Tenant layout component that renders the tenant layout, hydrating client state and prefetching tenant. Hydrates the query client, triggers a background prefetch for tenant, and renders a `Navbar`, children and `Footer`.
 * @param {ReactNode} children - Content to render inside the document body
 * @param {LayoutProps<"/tenants/[slug]">} params.slug - The slug of the tenant
 * @returns {Promise<JSX.Element>} A React element representing the tenant layout
 */
export default async function TenantLayout({
  children,
  params,
}: LayoutProps<"/tenants/[slug]">): Promise<JSX.Element> {
  const { slug } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({ slug }));

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col">
      <HydrateClient>
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar slug={slug} />
        </Suspense>
      </HydrateClient>
      <div className="flex-1">
        <div className="mx-auto max-w-7xl">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
