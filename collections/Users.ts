import type { CollectionConfig } from "payload";

/**
 * @description Configuration for the users collection.
 * @type {CollectionConfig}
 * @property {string} slug - The slug for the collection.
 * @property {object} admin - The admin configuration for the collection.
 * @property {string} admin.useAsTitle - The field to use as the title for the collection.
 * @property {boolean} auth - Whether the collection has an authentication field.
 * @property {Array} fields - The fields for the collection.
 * @property {object} fields.username - The username field for the collection.
 * @property {string} fields.username.type - The type of the username field.
 * @property {boolean} fields.username.required - Whether the username field is required.
 * @property {boolean} fields.username.unique - Whether the username field is unique.
 */
export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "username",
      required: true,
      unique: true,
      type: "text",
    },
  ],
};
