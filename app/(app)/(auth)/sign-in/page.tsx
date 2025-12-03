import { redirect } from "next/navigation";

import { caller } from "@/trpc/server";

import { SignInView } from "@/modules/auth/ui/views/sign-in-view";

export const dynamic = "force-dynamic";

/**
 * @description Render the sign-in page or redirect authenticated users to the site root.
 * @returns A redirect to "/" when a session user exists; otherwise the `SignInView` element.
 */
export default async function SignIn() {
  const session = await caller.auth.session();

  if (session.user) {
    return redirect("/");
  }

  return <SignInView />;
}
