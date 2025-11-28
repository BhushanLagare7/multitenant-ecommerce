import { cookies as getCookies } from "next/headers";

interface Props {
  prefix: string;
  value: string;
}

/**
 * @description Generates an authentication cookie.
 * @param {Object} props - The properties for the cookie.
 * @param {string} props.prefix - The prefix for the cookie.
 * @param {string} props.value - The value for the cookie.
 */
export const generateAuthCookie = async ({ prefix, value }: Props) => {
  const cookies = await getCookies();

  cookies.set({
    name: `${prefix}-token`,
    value,
    httpOnly: true,
    path: "/",
  });
};
