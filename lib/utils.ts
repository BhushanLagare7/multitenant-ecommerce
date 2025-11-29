import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for merging class names
 *
 * @param inputs - The class names to be merged
 * @returns The merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Utility function for generating tenant URLs
 * @description - This function takes a tenant slug as input and returns the URL for the tenant.
 * @param tenantSlug - The slug of the tenant
 * @returns The URL for the tenant
 */
export function generateTenantUrl(tenantSlug: string) {
  return `/tenants/${tenantSlug}`;
}

/**
 * Utility function for formatting currency
 * @description - This function takes a value as input and returns the formatted currency.
 * @param value - The value to be formatted
 * @returns {string} The formatted currency
 */
export function formatCurrency(value: string | number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value));
}
