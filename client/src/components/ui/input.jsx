import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-8 w-full rounded border border-outline-variant/80 bg-surface px-3 py-1 text-xs text-on-surface shadow-xs transition-colors file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-outline focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };

