import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary-container text-on-primary-container",
        secondary:
          "bg-secondary-fixed text-on-secondary-fixed",
        destructive:
          "bg-error-container text-on-error-container",
        tertiary:
          "bg-tertiary-fixed text-on-tertiary-fixed-variant",
        outline:
          "border border-outline-variant text-on-surface",
        neutral:
          "bg-surface-container text-on-surface-variant",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

