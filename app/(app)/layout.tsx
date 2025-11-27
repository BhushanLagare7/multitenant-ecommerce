import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { TRPCReactProvider } from "@/trpc/client";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Funroad",
  description:
    "The single platform for creating and scaling multiple online stores.",
};

/**
 * Root layout component that renders the HTML document root and applies global font and antialiasing.
 *
 * @param children - Content to render inside the document body
 * @returns A React element representing the page root (`<html>` with a `<body>` that contains `children`)
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        <NuqsAdapter>
          <TRPCReactProvider>
            {children}
            <Toaster />
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
