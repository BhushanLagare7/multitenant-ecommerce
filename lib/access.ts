import { ClientUser } from "payload";

import type { User } from "@/payload-types";

/**
 * @description Checks if the user is a super admin.
 * @param {ClientUser | User | null} user - The user to check.
 * @returns {boolean} - True if the user is a super admin, false otherwise.
 */
export const isSuperAdmin = (user: ClientUser | User | null): boolean => {
  return Boolean(user?.roles?.includes("super-admin"));
};
