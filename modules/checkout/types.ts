import type Stripe from "stripe";

/**
 * @description Product metadata
 * @type {ProductMetadata}
 * @property {string} stripeAccountId - The Stripe account ID.
 * @property {string} id - The product ID.
 * @property {string} name - The product name.
 * @property {number} price - The product price.
 */
export type ProductMetadata = {
  stripeAccountId: string;
  id: string;
  name: string;
  price: number;
};

/**
 * @description Checkout metadata
 * @type {CheckoutMetadata}
 * @property {string} userId - The user ID.
 */
export type CheckoutMetadata = {
  userId: string;
};

/**
 * @description A Stripe line item with expanded price and product, where product includes ProductMetadata.
 * Access pattern: expandedLineItem.price.product.metadata
 */
export type ExpandedLineItem = Stripe.LineItem & {
  price: Stripe.Price & {
    product: Stripe.Product & {
      metadata: ProductMetadata;
    };
  };
};
