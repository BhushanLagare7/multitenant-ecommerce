import { z } from "zod";

/**
 * @description Register schema for user registration.
 * @type {ZodObject}
 * @property {ZodString} email - The email field for user registration.
 * @property {ZodString} password - The password field for user registration.
 * @property {ZodString} username - The username field for user registration.
 */
export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(3, "Password must be at least 3 characters long"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(63, "Username must be at most 63 characters long")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username can only contain lowercase letters, numbers, and hyphens. It must start and end with a letter or number."
    )
    .refine(
      (value) => !value.includes("--"),
      "Username cannot contain consecutive hyphens."
    )
    .transform((value) => value.toLowerCase()),
});

/**
 * @description Login schema for user login.
 * @type {ZodObject}
 * @property {ZodString} email - The email field for user login.
 * @property {ZodString} password - The password field for user login.
 */
export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(3, "Password must be at least 3 characters long"),
});
