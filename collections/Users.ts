import type { ArrayField, CollectionConfig } from "payload";
import { tenantsArrayField } from "@payloadcms/plugin-multi-tenant/fields";

import { isSuperAdmin } from "@/lib/access";
/**
 * @description Default tenant array field for the users collection.
 * @type {TenantArrayField}
 * @property {string} tenantsArrayFieldName - The name of the tenants array field.
 * @property {string} tenantsCollectionSlug - The slug of the tenants collection.
 * @property {string} tenantsArrayTenantFieldName - The name of the tenants array tenant field.
 * @property {object} arrayFieldAccess - The access control for the array field.
 * @property {function} arrayFieldAccess.read - The read access control for the array field.
 * @property {function} arrayFieldAccess.create - The create access control for the array field.
 * @property {function} arrayFieldAccess.update - The update access control for the array field.
 * @property {object} tenantFieldAccess - The access control for the tenant field.
 * @property {function} tenantFieldAccess.read - The read access control for the tenant field.
 * @property {function} tenantFieldAccess.create - The create access control for the tenant field.
 * @property {function} tenantFieldAccess.update - The update access control for the tenant field.
 * @returns {ArrayField} The default tenant array field for the users collection.
 */
const defaultTenantArrayField: ArrayField = tenantsArrayField({
  tenantsArrayFieldName: "tenants",
  tenantsCollectionSlug: "tenants",
  tenantsArrayTenantFieldName: "tenant",
  arrayFieldAccess: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
  },
  tenantFieldAccess: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
  },
});

/**
 * @description Configuration for the users collection.
 * @type {CollectionConfig}
 * @property {string} slug - The slug for the collection.
 * @property {object} access - The access control for the collection.
 * @property {function} access.read - The read access control for the collection.
 * @property {function} access.create - The create access control for the collection.
 * @property {function} access.update - The update access control for the collection.
 * @property {function} access.delete - The delete access control for the collection.
 * @property {object} admin - The admin configuration for the collection.
 * @property {string} admin.useAsTitle - The field to use as the title for the collection.
 * @property {boolean} auth - Whether the collection has an authentication field.
 * @property {Array} fields - The fields for the collection.
 * @property {object} fields.username - The username field for the collection.
 * @property {string} fields.username.type - The type of the username field.
 * @property {boolean} fields.username.required - Whether the username field is required.
 * @property {boolean} fields.username.unique - Whether the username field is unique.
 * @property {object} fields.roles - The roles field for the collection.
 * @property {string} fields.roles.type - The type of the roles field.
 * @property {Array} fields.roles.options - The options for the roles field like `super-admin` and `user`.
 * @property {Array<string>} fields.roles.defaultValue - The default value for the roles field.
 * @property {boolean} fields.roles.hasMany - Whether the roles field can have multiple values.
 * @property {object} fields.roles.admin - The admin configuration for the roles field.
 * @property {string} fields.roles.admin.position - The position of the roles field in the admin.
 * @property {ArrayField} fields.tenants - The tenants field for the collection.
 * @property {object} fields.tenants.admin - The admin configuration for the tenants field.
 * @property {string} fields.tenants.admin.position - The position of the tenants field in the admin.
 */
export const Users: CollectionConfig = {
  slug: "users",
  access: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
    update: ({ req, id }) => {
      const user = req.user;
      // Super admin can update any user
      // User can update only their own user
      return isSuperAdmin(user) || user?.id === id;
    },
  },
  admin: {
    useAsTitle: "email",
    // Hide users collection from non-super-admin users in the admin UI
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  auth: true,
  fields: [
    {
      name: "username",
      required: true,
      unique: true,
      type: "text",
    },
    {
      ...defaultTenantArrayField,
      admin: { ...(defaultTenantArrayField?.admin || {}), position: "sidebar" },
    },
    {
      name: "roles",
      type: "select",
      defaultValue: ["user"],
      hasMany: true,
      options: ["super-admin", "user"],
      admin: { position: "sidebar" },
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
    },
  ],
};
