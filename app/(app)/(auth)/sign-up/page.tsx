import { redirect } from "next/navigation";

import { caller } from "@/trpc/server";

import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";

/**
 * Renders the sign-up page or redirects an authenticated user to the root path.
 *
 * @returns The sign-up page React element, or triggers a redirect to "/" when a user is already authenticated.
 */
export default async function SignUp() {
  const session = await caller.auth.session();

  if (session.user) {
    return redirect("/");
  }

  return <SignUpView />;
}