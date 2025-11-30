import Stripe from "stripe";

/**
 * @description Stripe client
 * @type {Stripe}
 * @property {string} apiVersion - The API version for the Stripe client.
 * @property {boolean} typescript - Whether the Stripe client is using TypeScript.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
  typescript: true,
});
