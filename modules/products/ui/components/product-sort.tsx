"use client";

import { JSX } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { useProductFilters } from "../../hooks/use-product-filters";

/**
 * Product sort component
 * @description A component that renders the product sort.
 * @returns {JSX.Element} A JSX element that renders the product sort component
 */
export const ProductSort = (): JSX.Element => {
  const [filters, setFilters] = useProductFilters();

  return (
    <div className="flex gap-2 items-center">
      <Button
        size="sm"
        className={cn(
          "bg-white rounded-full hover:bg-white",
          filters.sort !== "curated" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant="secondary"
        onClick={() => setFilters({ sort: "curated" })}
      >
        Curated
      </Button>
      <Button
        size="sm"
        className={cn(
          "bg-white rounded-full hover:bg-white",
          filters.sort !== "trending" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant="secondary"
        onClick={() => setFilters({ sort: "trending" })}
      >
        Trending
      </Button>
      <Button
        size="sm"
        className={cn(
          "bg-white rounded-full hover:bg-white",
          filters.sort !== "hot_and_new" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        variant="secondary"
        onClick={() => setFilters({ sort: "hot_and_new" })}
      >
        Hot & New
      </Button>
    </div>
  );
};
