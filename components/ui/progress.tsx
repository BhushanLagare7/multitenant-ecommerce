"use client";

import * as React from "react";

import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

/**
 * Render a horizontal progress bar that visually represents a percentage value.
 *
 * The indicator's horizontal translation corresponds to `value` (0–100); if `value` is undefined it is treated as 0.
 *
 * @param value - Progress percentage between 0 and 100
 * @returns A JSX element containing the progress bar and its indicator
 */
function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "overflow-hidden relative w-full h-3 rounded-full",
        // Modified classes
        "bg-transparent border",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="flex-1 w-full h-full bg-pink-400 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };