import type { CollectionConfig } from "payload";

/**
 * @description Configuration for the tenants collection.
 * @type {CollectionConfig}
 * @property {string} slug - The slug for the collection.
 * @property {object} admin - The admin configuration for the collection.
 * @property {string} admin.useAsTitle - The field to use as the title for the collection.
 * @property {Array} fields - The fields for the collection.
 * @property {object} fields.name - The name field for the collection.
 * @property {string} fields.name.type - The type of the name field.
 * @property {boolean} fields.name.required - Whether the name field is required.
 * @property {boolean} fields.name.unique - Whether the name field is unique.
 * @property {object} fields.slug - The slug field for the collection.
 * @property {string} fields.slug.type - The type of the slug field.
 * @property {boolean} fields.slug.required - Whether the slug field is required.
 * @property {boolean} fields.slug.unique - Whether the slug field is unique.
 * @property {object} fields.image - The image field for the collection.
 * @property {string} fields.image.type - The type of the image field.
 * @property {object} fields.stripeAccountId - The stripeAccountId field for the collection.
 * @property {string} fields.stripeAccountId.type - The type of the stripeAccountId field.
 * @property {boolean} fields.stripeAccountId.required - Whether the stripeAccountId field is required.
 * @property {object} fields.stripeDetailsSubmitted - The stripeDetailsSubmitted field for the collection.
 * @property {string} fields.stripeDetailsSubmitted.type - The type of the stripeDetailsSubmitted field.
 * @property {object} fields.stripeDetailsSubmitted.admin - The admin configuration for the stripeDetailsSubmitted field.
 * @property {boolean} fields.stripeDetailsSubmitted.readOnly - Whether the stripeDetailsSubmitted field is read-only.
 * @property {string} fields.stripeDetailsSubmitted.description - The description for the stripeDetailsSubmitted field.
 */
export const Tenants: CollectionConfig = {
  slug: "tenants",
  admin: {
    useAsTitle: "slug",
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
      label: "Store Name",
      admin: {
        description: "This is the name of the store (e.g. Bhushan's store)",
      },
    },
    {
      name: "slug",
      type: "text",
      index: true,
      unique: true,
      required: true,
      admin: {
        description:
          "This is the subdomain for the store (e.g. [slug].funroad.com)",
      },
    },
    { name: "image", type: "upload", relationTo: "media" },
    {
      name: "stripeAccountId",
      type: "text",
      required: true,
      admin: { readOnly: true },
    },
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      admin: {
        readOnly: true,
        description:
          "You cannot create products until you submit your Stripe details.",
      },
    },
  ],
};
