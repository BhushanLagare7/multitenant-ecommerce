"use client";

import { ChangeEvent } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PriceFilterProps {
  minPrice?: string | null;
  maxPrice?: string | null;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

/**
 * Formats a numeric string as a currency value.
 * @description A function that formats a numeric string as a currency value.
 * @param {string} value - The numeric string to format
 * @returns {string} The formatted currency value
 */
export const formatAsCurrency = (value: string) => {
  const numericValue = value.replace(/[^0-9]/g, "");
  const parts = numericValue.split(".");
  const formattedValue =
    parts[0] + (parts.length > 1 ? "." + parts[1]?.slice(0, 2) : "");

  if (!formattedValue) return "";

  const numberValue = parseFloat(formattedValue);

  if (isNaN(numberValue)) return "";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numberValue);
};

/**
 * Price filter component
 *
 * @param props.minPrice - The minimum price
 * @param props.maxPrice - The maximum price
 * @param props.onMinPriceChange - The callback function to be called when the minimum price changes
 * @param props.onMaxPriceChange - The callback function to be called when the maximum price changes
 * @returns The price filter component
 */
export const PriceFilter = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: PriceFilterProps) => {
  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Get the raw input value and extract numeric characters only
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    onMinPriceChange(numericValue);
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Get the raw input value and extract numeric characters only
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    onMaxPriceChange(numericValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label className="text-base font-medium">Minimum Price</Label>
        <Input
          type="text"
          placeholder="$0"
          value={minPrice ? formatAsCurrency(minPrice) : ""}
          onChange={handleMinPriceChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-base font-medium">Maximum Price</Label>
        <Input
          type="text"
          placeholder="∞" // infinity symbol
          value={maxPrice ? formatAsCurrency(maxPrice) : ""}
          onChange={handleMaxPriceChange}
        />
      </div>
    </div>
  );
};
