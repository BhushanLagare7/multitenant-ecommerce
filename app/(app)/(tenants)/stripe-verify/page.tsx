"use client";

import { JSX, useEffect } from "react";

import { LoaderIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

/**
 * Stripe Verify Page
 * @description This page is used to verify the stripe checkout session
 * @returns {JSX.Element} Stripe Verify Page
 */
export default function StripeVerifyPage(): JSX.Element {
  const trpc = useTRPC();
  const { mutate: verify } = useMutation(
    trpc.checkout.verify.mutationOptions({
      onSuccess: (data) => {
        window.location.assign(data.url);
      },
      onError: () => {
        window.location.assign("/");
      },
    })
  );

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoaderIcon className="animate-spin text-muted-foreground" />
    </div>
  );
}
