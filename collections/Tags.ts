import type { CollectionConfig } from "payload";

/**
 * @description Configuration for the tags collection.
 * @type {CollectionConfig}
 * @property {string} slug - The slug for the collection.
 * @property {object} admin - The admin configuration for the collection.
 * @property {string} admin.useAsTitle - The field to use as the title for the collection.
 * @property {Array} fields - The fields for the collection.
 * @property {object} fields.name - The name field for the collection.
 * @property {string} fields.name.type - The type of the name field.
 * @property {boolean} fields.name.required - Whether the name field is required.
 * @property {boolean} fields.name.unique - Whether the name field is unique.
 * @property {object} fields.products - The products field for the collection.
 * @property {string} fields.products.type - The type of the products field.
 * @property {string} fields.products.relationTo - The relation to the products field.
 * @property {boolean} fields.products.hasMany - Whether the products field has many values.
 */
export const Tags: CollectionConfig = {
  slug: "tags",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
  ],
};
