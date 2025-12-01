import { JSX, Suspense } from "react";
import Link from "next/link";

import { ArrowLeftIcon } from "lucide-react";

import { ProductList, ProductListSkeleton } from "../components/product-list";

/**
 * Library view component
 * @description Renders the library view with a navigation bar, header, and product list
 * @returns {JSX.Element} A JSX element that renders the library view component
 */
export const LibraryView = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 bg-[#F4F4F0] w-full border-b">
        <Link prefetch href="/" className="flex gap-2 items-center">
          <ArrowLeftIcon className="size-4" />
          <span className="text-base font-medium">Continue Shopping</span>
        </Link>
      </nav>
      <header className="bg-[#F4F4F0] py-8 border-b">
        <div className="flex flex-col gap-y-4 px-4 mx-auto max-w-7xl lg:px-12">
          <h1 className="text-[40px] font-medium">Library</h1>
          <p className="font-medium">Your purchases and reviews</p>
        </div>
      </header>
      <section className="px-4 py-10 mx-auto max-w-7xl lg:px-12">
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList />
        </Suspense>
      </section>
    </div>
  );
};
