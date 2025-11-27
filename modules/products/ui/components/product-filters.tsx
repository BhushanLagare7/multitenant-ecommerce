"use client";

import { useState } from "react";

import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { useProductFilters } from "../../hooks/use-product-filters";

import { PriceFilter } from "./price-filter";

interface ProductFilterProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const ProductFilter = ({ title, className, children }: ProductFilterProps) => {
  const [open, setOpen] = useState(false);

  const Icon = open ? ChevronDownIcon : ChevronRightIcon;

  return (
    <div className={cn("flex flex-col gap-2 p-4 border-b", className)}>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <p className="font-medium">{title}</p>
        <Icon className="size-5" />
      </div>
      {open && children}
    </div>
  );
};

export const ProductFilters = () => {
  const [filters, setFilters] = useProductFilters();

  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-md border">
      <div className="flex justify-between items-center p-4 border-b">
        <p className="font-medium">Filters</p>
        <button type="button" className="underline" onClick={() => {}}>
          Clear
        </button>
      </div>
      <ProductFilter title="Price" className="border-b-0">
        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={(value) => onChange("minPrice", value)}
          onMaxPriceChange={(value) => onChange("maxPrice", value)}
        />
      </ProductFilter>
    </div>
  );
};
