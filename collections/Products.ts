import type { CollectionConfig } from "payload";

/**
 * @description Configuration for the products collection.
 * @type {CollectionConfig}
 * @property {string} slug - The slug for the collection.
 * @property {Array} fields - The fields for the collection.
 * @property {object} fields.name - The name field for the collection.
 * @property {string} fields.name.type - The type of the name field.
 * @property {boolean} fields.name.required - Whether the name field is required.
 * @property {object} fields.description - The description field for the collection.
 * @property {string} fields.description.type - The type of the description field.
 * @property {object} fields.price - The price field for the collection.
 * @property {string} fields.price.type - The type of the price field.
 * @property {boolean} fields.price.required - Whether the price field is required.
 * @property {object} fields.category - The category field for the collection.
 * @property {string} fields.category.type - The type of the category field.
 * @property {string} fields.category.relationTo - The relation to the category field.
 * @property {boolean} fields.category.hasMany - Whether the category field has many values.
 * @property {object} fields.tags - The tags field for the collection.
 * @property {string} fields.tags.type - The type of the tags field.
 * @property {string} fields.tags.relationTo - The relation to the tags field.
 * @property {boolean} fields.tags.hasMany - Whether the tags field has many values.
 * @property {object} fields.image - The image field for the collection.
 * @property {string} fields.image.type - The type of the image field.
 * @property {string} fields.image.relationTo - The relation to the image field.
 * @property {object} fields.refundPolicy - The refund policy field for the collection.
 * @property {string} fields.refundPolicy.type - The type of the refund policy field.
 * @property {Array} fields.refundPolicy.options - The options for the refund policy field. Options are: `30-day`, `14-day`, `7-day`, `3-day`, `1-day`, `no-refunds`
 * @property {string} fields.refundPolicy.defaultValue - The default value for the refund policy field.
 */
export const Products: CollectionConfig = {
  slug: "products",
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
      name: "description",
      type: "text",
    },
    {
      name: "price",
      type: "number",
      required: true,
      admin: {
        description: "Price in USD",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "refundPolicy",
      type: "select",
      options: ["30-day", "14-day", "7-day", "3-day", "1-day", "no-refunds"],
      defaultValue: "30-day",
    },
  ],
};
