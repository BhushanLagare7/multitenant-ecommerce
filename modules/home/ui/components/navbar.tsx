"use client";

import { useState } from "react";
import { Route } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MenuIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { NavbarSidebar } from "./navbar-sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarItemProps {
  href: Route<string>;
  children: React.ReactNode;
  isActive?: boolean;
}

/**
 * Navbar item component
 * @description A component that renders the navbar item.
 * @param props.href - The href of the item
 * @param props.children - The children of the item
 * @param props.isActive - The active state of the item
 * @returns JSX.Element A JSX element that renders the navbar item component
 */
const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems: NavbarItemProps[] = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

/**
 * Navbar component
 * @description A component that renders the navbar.
 * @returns {JSX.Element} A JSX element that renders the navbar component
 */
export const Navbar = () => {
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <nav className="flex justify-between h-20 font-medium bg-white border-b">
      <Link href="/" className="flex items-center pl-6">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          funroad
        </span>
      </Link>

      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />

      <div className="hidden gap-4 items-center lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      {session.data?.user ? (
        <div className="hidden lg:flex">
          <Button
            className="px-12 h-full text-lg text-white bg-black rounded-none border-t-0 border-r-0 border-b-0 border-l transition-colors hover:bg-pink-400 hover:text-black"
            asChild
          >
            <Link href="/admin">Dashboard</Link>
          </Button>
        </div>
      ) : (
        <div className="hidden lg:flex">
          <Button
            variant="outline"
            className="px-12 h-full text-lg bg-white rounded-none border-t-0 border-r-0 border-b-0 border-l transition-colors hover:bg-pink-400"
            asChild
          >
            <Link prefetch href="/sign-in">
              Login
            </Link>
          </Button>
          <Button
            className="px-12 h-full text-lg text-white bg-black rounded-none border-t-0 border-r-0 border-b-0 border-l transition-colors hover:bg-pink-400 hover:text-black"
            asChild
          >
            <Link prefetch href="/sign-up">
              Start Selling
            </Link>
          </Button>
        </div>
      )}

      <div className="flex justify-center items-center lg:hidden">
        <Button
          variant="ghost"
          className="bg-white border-transparent size-12"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
