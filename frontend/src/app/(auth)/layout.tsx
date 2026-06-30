import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Acesso | Mais que Mimo",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mqm-shell flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md px-4 py-8">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <span className="font-display text-3xl font-medium text-primary">
              mais que mimo
            </span>
            <span className="mt-1 block text-xs text-muted-foreground tracking-widest uppercase">
              papelaria boutique
            </span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
