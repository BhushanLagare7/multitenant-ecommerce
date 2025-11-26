"use client";

import { useParams } from "next/navigation";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_CATEGORY_BACKGROUND_COLOR } from "@/modules/home/constants";

import { BreadcrumbNavigation } from "./breadcrumb-navigation";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";

export const SearchFilters = () => {
  const params = useParams<{
    category: string | undefined;
    subcategory: string | undefined;
  }>();

  const categoryParam = params.category;
  const activeCategorySlug = categoryParam || "all";

  const trpc = useTRPC();
  const { data: categories } = useSuspenseQuery(
    trpc.categories.getMany.queryOptions()
  );
  const activeCategoryData = categories.find(
    (category) => category.slug === activeCategorySlug
  );
  const activeCategoryColor =
    activeCategoryData?.color || DEFAULT_CATEGORY_BACKGROUND_COLOR;
  const activeCategoryName = activeCategoryData?.name || null;

  const activeSubcategory = params.subcategory;
  const activeSubcategoryName =
    activeCategoryData?.subcategories.find(
      (subcategory) => subcategory.slug === activeSubcategory
    )?.name || null;

  return (
    <div
      className="flex flex-col gap-4 px-4 py-8 w-full border-b lg:px-12"
      style={{ backgroundColor: activeCategoryColor }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories />
      </div>
      <BreadcrumbNavigation
        activeCategorySlug={activeCategorySlug}
        activeCategoryName={activeCategoryName}
        activeSubcategoryName={activeSubcategoryName}
      />
    </div>
  );
};

export const SearchFiltersSkeleton = () => {
  return (
    <div
      className="flex flex-col gap-4 px-4 py-8 w-full border-b lg:px-12"
      style={{ backgroundColor: DEFAULT_CATEGORY_BACKGROUND_COLOR }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Skeleton className="w-full h-11" />
      </div>
      <Skeleton className="w-48 h-6" />
    </div>
  );
};
