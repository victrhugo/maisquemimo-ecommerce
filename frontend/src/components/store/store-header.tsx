"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/produtos", label: "Loja" },
  { href: "/produtos?categoria=cadernos", label: "Cadernos" },
  { href: "/produtos?categoria=planner", label: "Planners" },
  { href: "/produtos?categoria=presentes", label: "Presentes" },
  { href: "/produtos?categoria=canetas", label: "Escrita" },
  { href: "/produtos?categoria=kits", label: "Kits" },
];

export function StoreHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[color-mix(in_srgb,var(--mqm-olive-200)_45%,transparent)] bg-[color-mix(in_srgb,var(--mqm-warm-50)_96%,white)]/95 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-18 items-center justify-between md:hidden">
          <Link href="/" className="group flex items-center gap-2.5 leading-none sm:gap-3">
            <Image
              src="/images.png"
              alt="Logo Mais que Mimo"
              width={46}
              height={46}
              priority
              className="h-11 w-11 rounded-full object-cover"
            />
            <span className="font-display text-[1.35rem] font-semibold text-primary tracking-[0.01em]">
              mais que mimo
            </span>
          </Link>

          <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon-sm" asChild aria-label="Buscar produtos">
              <Link href="/produtos">
                <Search className="size-5" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon-sm"
              asChild
              aria-label={`Carrinho (${itemCount} itens)`}
              className="relative"
            >
              <Link href="/carrinho">
                <ShoppingBag className="size-5" />
                {itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--mqm-blush-300)] text-[10px] font-bold text-[var(--mqm-olive-800)]">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        <div className="hidden h-20 items-center justify-between gap-7 md:flex">
          <Link href="/" className="group flex items-center gap-3 leading-none">
            <Image
              src="/images.png"
              alt="Logo Mais que Mimo"
              width={52}
              height={52}
              priority
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="font-display text-[1.55rem] font-semibold text-primary tracking-[0.01em]">
              mais que mimo
            </span>
          </Link>

          <nav className="flex flex-1 items-center justify-center gap-1" aria-label="Navegação principal">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors duration-[var(--motion-fast)] hover:bg-[var(--mqm-blush-100)] hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon-sm" asChild aria-label="Buscar produtos">
              <Link href="/produtos">
                <Search className="size-5" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon-sm" asChild aria-label="Minha conta" className="inline-flex">
              <Link href="/conta">
                <User className="size-5" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon-sm"
              asChild
              aria-label={`Carrinho (${itemCount} itens)`}
              className="relative"
            >
              <Link href="/carrinho">
                <ShoppingBag className="size-5" />
                {itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--mqm-blush-300)] text-[10px] font-bold text-[var(--mqm-olive-800)]">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          menuOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <nav
          className="mx-4 mb-3 mt-1 flex flex-col gap-1 rounded-[var(--radius-lg)] bg-[var(--mqm-warm-50)] p-2 shadow-[var(--shadow-sm)]"
          aria-label="Navegação mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-[var(--mqm-blush-100)]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
