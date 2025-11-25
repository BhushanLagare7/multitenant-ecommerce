import React from "react";

import { getPayload } from "payload";
import configPromise from "@payload-config";

import { Category } from "@/payload-types";

import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";

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
  const payload = await getPayload({
    config: configPromise,
  });

  const categories = await payload.find({
    collection: "categories",
    depth: 1, // Populate Subcategories, subcategories.[0] wiil be a type of "Category"
    pagination: false,
    where: { parent: { exists: false } },
  });

  const formattedCategories = categories.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      // Because of "depth: 1" we are confident doc will be a type of "Category"
      ...(doc as Category),
      subcategories: undefined,
    })),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters categories={formattedCategories} />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
}
