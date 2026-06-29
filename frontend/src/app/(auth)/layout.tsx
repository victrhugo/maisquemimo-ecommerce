import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acesso | Mais que Mimo",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--mqm-cream-50)]">
      <div className="w-full max-w-md px-4 py-8">
        {/* Logo */}
        <div className="mb-8 text-center">
          <a href="/" className="inline-block">
            <span className="font-display text-3xl font-semibold text-[var(--mqm-rose-600)]">
              mais que mimo
            </span>
            <span className="mt-1 block text-xs text-muted-foreground tracking-widest uppercase">
              papelaria afetiva
            </span>
          </a>
        </div>
        {children}
      </div>
    </div>
  );
}
