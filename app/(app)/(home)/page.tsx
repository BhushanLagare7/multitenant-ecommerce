"use client";

import { JSX } from "react";

import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

/**
 * Render the home page and prefetch the session for client hydration.
 * @description A page that renders the home page and prefetches the session for client hydration.
 * @returns {JSX.Element} A JSX element that hydrates prefetched session data and renders the home page
 */
export default function Home(): JSX.Element {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.auth.session.queryOptions());

  return <div>{JSON.stringify(data?.user, null, 2)}</div>;
}
