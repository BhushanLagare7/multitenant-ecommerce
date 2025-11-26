import { redirect } from "next/navigation";

import { caller } from "@/trpc/server";

import { SignInView } from "@/modules/auth/ui/views/sign-in-view";

export default async function SignIn() {
  const session = await caller.auth.session();

  if (session.user) {
    return redirect("/");
  }

  return <SignInView />;
}
