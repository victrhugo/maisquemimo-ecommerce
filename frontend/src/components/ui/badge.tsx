import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground",
        destructive:
          "bg-destructive text-destructive-foreground",
        outline:
          "bg-[var(--mqm-warm-50)] text-foreground shadow-[var(--shadow-xs)]",
        rose:
          "bg-[var(--mqm-blush-100)] text-[var(--mqm-blush-800)]",
        mauve:
          "bg-[var(--mqm-olive-100)] text-[var(--mqm-olive-800)]",
        sage:
          "bg-[var(--mqm-olive-200)] text-[var(--mqm-olive-800)]",
        amber:
          "bg-[var(--mqm-warm-200)] text-[var(--mqm-olive-800)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
