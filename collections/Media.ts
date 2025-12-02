import type { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";

/**
 * @description Configuration for the media collection.
 * @type {CollectionConfig}
 * @property {string} slug - The slug for the collection.
 * @property {object} access - The access configuration for the collection.
 * @property {function} access.read - The read access configuration for the collection.
 * @property {Array} fields - The fields for the collection.
 * @property {object} fields.alt - The alt field for the collection.
 * @property {string} fields.alt.type - The type of the alt field.
 * @property {boolean} fields.alt.required - Whether the alt field is required.
 * @property {boolean} upload - Whether the collection has an upload field.
 */
export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
