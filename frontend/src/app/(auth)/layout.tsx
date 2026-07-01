import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Acesso | Mais que Mimo",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mqm-shell flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md px-4 py-8">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/images.png"
              alt="Logo Mais que Mimo"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover shadow-[var(--shadow-sm)]"
            />
            <span className="text-left">
              <span className="font-display text-3xl font-medium text-primary">
                mais que mimo
              </span>
              <span className="mt-1 block text-xs text-muted-foreground tracking-widest uppercase">
                papelaria com carinho
              </span>
            </span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
