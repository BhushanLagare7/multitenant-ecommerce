import React, { Suspense } from "react";

import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

import { Footer } from "@/modules/home/ui/components/footer";
import { Navbar } from "@/modules/home/ui/components/navbar";
import {
  SearchFilters,
  SearchFiltersSkeleton,
} from "@/modules/home/ui/components/search-filters";

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Provides the app page layout with a top navigation bar, a flexible content area, and a footer.
 *
 * @param children - Content to render inside the layout's central flexible area.
 * @returns A JSX element that renders the Navbar, the children inside a flex-grow content area, and the Footer.
 */
export default async function Layout({ children }: LayoutProps) {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrateClient>
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>
      </HydrateClient>

      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
}
