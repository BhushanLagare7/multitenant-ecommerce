import type { CollectionConfig } from "payload";

/**
 * @description Configuration for the categories collection.
 * @type {CollectionConfig} - The configuration object for the categories collection.
 * @property {string} slug - The slug for the collection.
 * @property {object} admin - The admin configuration for the collection.
 * @property {string} admin.useAsTitle - The field to use as the title for the collection.
 * @property {Array} fields - The fields for the collection.
 * @property {object} fields.name - The name field for the collection.
 * @property {string} fields.name.type - The type of the name field.
 * @property {boolean} fields.name.required - Whether the name field is required.
 * @property {object} fields.slug - The slug field for the collection.
 * @property {string} fields.slug.type - The type of the slug field.
 * @property {boolean} fields.slug.required - Whether the slug field is required.
 * @property {boolean} fields.slug.unique - Whether the slug field is unique.
 * @property {boolean} fields.slug.index - Whether the slug field is indexed.
 * @property {object} fields.color - The color field for the collection.
 * @property {string} fields.color.type - The type of the color field.
 * @property {object} fields.parent - The parent field for the collection.
 * @property {string} fields.parent.type - The type of the parent field.
 * @property {string} fields.parent.relationTo - The relation to the parent field.
 * @property {boolean} fields.parent.hasMany - Whether the parent field has many values.
 * @property {object} fields.subcategories - The subcategories field for the collection.
 * @property {string} fields.subcategories.type - The type of the subcategories field.
 * @property {string} fields.subcategories.collection - The collection of the subcategories field.
 * @property {string} fields.subcategories.on - The on field of the subcategories field.
 * @property {boolean} fields.subcategories.hasMany - Whether the subcategories field has many values.
 */
export const Categories: CollectionConfig = {
  slug: "categories",
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
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "color",
      type: "text",
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    {
      name: "subcategories",
      type: "join",
      collection: "categories",
      on: "parent",
      hasMany: true,
    },
  ],
};
