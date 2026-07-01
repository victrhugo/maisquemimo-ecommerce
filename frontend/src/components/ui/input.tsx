import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "mqm-field flex h-11 w-full rounded-[var(--radius-pill)] border-transparent bg-background/90 px-5 py-2 shadow-[var(--shadow-xs)]",
          "text-sm text-foreground placeholder:text-muted-foreground",
          "ring-offset-background transition-all duration-[var(--motion-fast)] ease-[var(--ease-brand)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          "focus-visible:bg-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
