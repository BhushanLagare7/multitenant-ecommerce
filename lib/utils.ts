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
