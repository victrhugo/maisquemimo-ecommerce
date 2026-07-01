import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-pill)] text-sm font-semibold transition-all duration-[var(--motion-base)] ease-[var(--ease-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-55 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[var(--shadow-sm)] hover:brightness-105 hover:shadow-[var(--shadow-md)] active:scale-[0.99]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[var(--shadow-xs)] hover:brightness-96",
        outline:
          "bg-[color-mix(in_srgb,var(--card)_86%,white)] text-foreground shadow-[var(--shadow-xs)] hover:bg-[var(--mqm-warm-50)] hover:text-primary",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[var(--shadow-xs)] hover:bg-[var(--mqm-blush-200)]",
        ghost:
          "text-muted-foreground hover:bg-[color-mix(in_srgb,var(--mqm-blush-100)_55%,white)] hover:text-accent-foreground",
        link:
          "text-primary underline-offset-4 hover:text-[var(--mqm-olive-700)] hover:underline",
        brand:
          "bg-[var(--gradient-brand)] text-[var(--mqm-blush-100)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] active:scale-[0.99]",
        soft:
          "bg-[var(--mqm-blush-100)] text-[var(--mqm-olive-800)] shadow-[var(--shadow-xs)] hover:bg-[var(--mqm-blush-200)]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-[var(--radius-pill)] px-4 text-xs",
        lg: "h-12 rounded-[var(--radius-pill)] px-8 text-base",
        xl: "h-14 rounded-[var(--radius-pill)] px-10 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-9 w-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin size-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12" cy="12" r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>Carregando…</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
