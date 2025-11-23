import { Route } from "next";
import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface NavbarItem {
  href: Route<string>;
  children: React.ReactNode;
}

interface NavbarSidebarProps {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({
  items,
  open,
  onOpenChange,
}: NavbarSidebarProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex overflow-y-auto flex-col pb-2 h-full">
          {items.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className="flex items-center p-4 w-full text-base font-medium text-left hover:bg-black hover:text-white"
              onClick={() => onOpenChange(false)}
            >
              {item.children}
            </Link>
          ))}
          <div className="border-t">
            <Link
              href="/sign-in"
              className="flex items-center p-4 w-full text-base font-medium text-left hover:bg-black hover:text-white"
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className="flex items-center p-4 w-full text-base font-medium text-left hover:bg-black hover:text-white"
            >
              Start Selling
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
