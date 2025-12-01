"use client";

import { JSX } from "react";

import { InboxIcon } from "lucide-react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { DEFAULT_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";

import { Button } from "@/components/ui/button";

import { ProductCard, ProductCardSkeleton } from "./product-card";

/**
 * Product list component
 * @description Renders a list of products with infinite scrolling, product pagination, and empty state handling
 * @returns {JSX.Element} A JSX element that renders the product list component
 */
export const ProductList = (): JSX.Element => {
  const trpc = useTRPC();
  const {
    data: products,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery(
    trpc.library.getMany.infiniteQueryOptions(
      { limit: DEFAULT_LIMIT },
      {
        getNextPageParam: (lastPage) =>
          lastPage.docs.length > 0 ? lastPage.nextPage : undefined,
      }
    )
  );

  if (products?.pages[0]?.docs.length === 0) {
    return (
      <div className="flex flex-col gap-y-4 justify-center items-center p-8 w-full bg-white rounded-lg border border-black border-dashed">
        <InboxIcon />
        <p className="text-base font-medium">No products found</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {products?.pages
          .flatMap((page) => page.docs)
          .map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.image?.url}
              tenantSlug={product.tenant?.slug}
              tenantImageUrl={product.tenant?.image?.url}
              reviewRating={3}
              reviewCount={5}
            />
          ))}
      </div>
      <div className="flex justify-center pt-8">
        {hasNextPage && (
          <Button
            variant="elevated"
            className="text-base font-medium bg-white disabled:opacity-50"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            Load More
          </Button>
        )}
      </div>
    </>
  );
};

/**
 * Product list skeleton component
 * @description Renders a grid of product cards with skeleton loading states
 * @returns {JSX.Element} A JSX element that renders the product list skeleton component
 */
export const ProductListSkeleton = (): JSX.Element => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
