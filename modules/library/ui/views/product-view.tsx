"use client";

import { JSX, Suspense } from "react";
import Link from "next/link";

import { ArrowLeftIcon } from "lucide-react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { ReviewFormSkeleton } from "../components/review-form";
import { ReviewSidebar } from "../components/review-sidebar";

interface ProductViewProps {
  productId: string;
}

/**
 * Product view component
 * @description Renders the product view with a navigation bar, header, and product list
 * @returns {JSX.Element} A JSX element that renders the product view component
 */
export const ProductView = ({ productId }: ProductViewProps): JSX.Element => {
  const trpc = useTRPC();
  const { data: product } = useSuspenseQuery(
    trpc.library.getOne.queryOptions({ productId })
  );

  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 bg-[#F4F4F0] w-full border-b">
        <Link prefetch href="/library" className="flex gap-2 items-center">
          <ArrowLeftIcon className="size-4" />
          <span className="text-base font-medium">Back to Library</span>
        </Link>
      </nav>
      <header className="bg-[#F4F4F0] py-8 border-b">
        <div className="px-4 mx-auto max-w-7xl lg:px-12">
          <h1 className="text-[40px] font-medium">{product.name}</h1>
        </div>
      </header>
      <section className="px-4 py-10 mx-auto max-w-7xl lg:px-12">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="gap-4 p-4 bg-white rounded-md border">
              <Suspense fallback={<ReviewFormSkeleton />}>
                <ReviewSidebar productId={productId} />
              </Suspense>
            </div>
          </div>
          <div className="lg:col-span-5">
            {product.content ? (
              <RichText data={product.content} />
            ) : (
              <p className="italic font-medium text-muted-foreground">
                No special content
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

/**
 * Product view skeleton
 * @description This component is used to display a skeleton while loading the product view
 * @returns {JSX.Element} Product view skeleton
 */
export const ProductViewSkeleton = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 bg-[#F4F4F0] w-full border-b">
        <div className="flex gap-2 items-center">
          <ArrowLeftIcon className="size-4" />
          <span className="text-base font-medium">Back to Library</span>
        </div>
      </nav>
    </div>
  );
};
