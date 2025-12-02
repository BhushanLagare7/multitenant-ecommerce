import type { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";

/**
 * @description Configuration for the reviews collection.
 * @type {CollectionConfig} - The configuration object for the reviews collection.
 * @property {string} slug - The slug for the collection.
 * @property {object} admin - The admin configuration for the collection.
 * @property {string} admin.useAsTitle - The field to use as the title for the collection.
 * @property {Array} fields - The fields for the collection.
 * @property {object} fields.description - The description field for the collection.
 * @property {string} fields.description.type - The type of the description field.
 * @property {boolean} fields.description.required - Whether the description field is required.
 * @property {object} fields.rating - The rating field for the collection.
 * @property {string} fields.rating.type - The type of the rating field.
 * @property {boolean} fields.rating.required - Whether the rating field is required.
 * @property {object} fields.product - The product field for the collection.
 * @property {string} fields.product.type - The type of the product field.
 * @property {boolean} fields.product.required - Whether the product field is required.
 * @property {object} fields.user - The user field for the collection.
 * @property {string} fields.user.type - The type of the user field.
 * @property {boolean} fields.user.required - Whether the user field is required.
 */
export const Reviews: CollectionConfig = {
  slug: "reviews",
  access: {
    read: ({ req }) => isSuperAdmin(req.user),
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: "description",
  },
  fields: [
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      hasMany: false,
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
    },
  ],
};
