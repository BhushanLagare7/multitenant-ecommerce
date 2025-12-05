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
  const isDevelopment = process.env.NODE_ENV === "development";
  const isSubdomainRoutingEnabled =
    process.env.NEXT_PUBLIC_SUBDOMAIN_ROUTING_ENABLED === "true";

  // In development or subdomain routing is disabled, use normal routing
  if (isDevelopment || !isSubdomainRoutingEnabled) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
      throw new Error(
        "NEXT_PUBLIC_APP_URL is not defined in environment variables"
      );
    }
    return `${appUrl}/tenants/${tenantSlug}`;
  }

  const protocol = "https";
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  if (!domain) {
    throw new Error(
      "NEXT_PUBLIC_ROOT_DOMAIN is not defined in environment variables"
    );
  }

  // In production or subdomain routing is enabled, use subdomain routing
  return `${protocol}://${tenantSlug}.${domain}`;
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
