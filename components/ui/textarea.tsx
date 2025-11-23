import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Render a styled HTML textarea with configurable classes and forwarded props.
 *
 * The component applies a predefined set of utility classes for layout, sizing,
 * focus/invalid/disabled states, and dark mode, then merges any `className`
 * provided by the caller. All other textarea props are forwarded to the
 * underlying element.
 *
 * @param className - Additional CSS classes to merge with the component's base classes
 * @returns The rendered textarea element with merged classes and forwarded props
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        // Modified classes
        "bg-white md:text-base",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
