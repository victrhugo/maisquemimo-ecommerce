import { StoreHeader } from "@/components/store/store-header";
import { StoreFooter } from "@/components/store/store-footer";
import type { ReactNode } from "react";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--gradient-paper)]">
      <StoreHeader />
      <main className="flex-1 pb-12 sm:pb-16">{children}</main>
      <StoreFooter />
    </div>
  );
}
