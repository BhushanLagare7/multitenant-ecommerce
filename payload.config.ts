// storage-adapter-import-placeholder
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import { Categories } from "./collections/Categories";
import { Media } from "./collections/Media";
import { Orders } from "./collections/Orders";
import { Products } from "./collections/Products";
import { Tags } from "./collections/Tags";
import { Tenants } from "./collections/Tenants";
import { Users } from "./collections/Users";
import { Config } from "./payload-types";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * @description Configuration for the payload config.
 * @type {PayloadConfig}
 * @property {string} admin.user - The user collection to use for authentication.
 * @property {object} admin.importMap - The import map for the admin.
 * @property {string} admin.importMap.baseDir - The base directory for the import map.
 * @property {Array} collections - The collections to use for the payload.
 * @property {object} editor - The editor to use for the payload.
 * @property {string} secret - The secret to use for the payload.
 * @property {object} typescript - The typescript configuration for the payload.
 * @property {string} typescript.outputFile - The output file for the typescript configuration.
 * @property {object} db - The database configuration for the payload.
 * @property {string} db.url - The URL for the database.
 * @property {object} sharp - The sharp configuration for the payload.
 * @property {Array} plugins - The plugins to use for the payload.
 */
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories, Products, Tags, Tenants, Orders],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [
    multiTenantPlugin<Config>({
      collections: { products: {} },
      tenantsArrayField: { includeDefaultField: false },
      userHasAccessToAllTenants: (user) =>
        Boolean(user?.roles?.includes("super-admin")),
    }),
    // storage-adapter-placeholder
  ],
});
