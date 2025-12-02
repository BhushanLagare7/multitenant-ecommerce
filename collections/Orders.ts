import type { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";

/**
 * @description Order collection
 * @type {CollectionConfig}
 * @property {string} slug - The slug for the collection.
 * @property {object} admin - The admin configuration for the collection.
 * @property {string} admin.useAsTitle - The field to use as the title for the collection.
 * @property {Array} fields - The fields for the collection.
 */
export const Orders: CollectionConfig = {
  slug: "orders",
  access: {
    read: ({ req }) => isSuperAdmin(req.user),
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: false,
    },
    {
      name: "stripeCheckoutSessionId",
      type: "text",
      required: true,
      admin: {
        description: "Stripe checkout session id with this order",
      },
    },
    {
      name: "stripeAccountId",
      type: "text",
      admin: {
        description: "Stripe account id associated with this order",
      },
    },
  ],
};
