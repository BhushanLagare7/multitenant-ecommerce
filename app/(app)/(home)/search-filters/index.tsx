"use client";

import { Skeleton } from "@/components/ui/skeleton";

import { Categories } from "./categories";
import { SearchInput } from "./search-input";

export const SearchFilters = () => {
  return (
    <div
      className="flex flex-col gap-4 py-8 px-4 w-full border-b lg:px-12"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories />
      </div>
    </div>
  );
};

export const SearchFiltersSkeleton = () => {
  return (
    <div
      className="flex flex-col gap-4 py-8 px-4 w-full border-b lg:px-12"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Skeleton className="w-full h-11" />
      </div>
    </div>
  );
};
