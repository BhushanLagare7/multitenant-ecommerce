import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/client";

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
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
