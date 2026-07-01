"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Search, Heart, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/produtos", label: "Coleção" },
  { href: "/produtos?categoria=cadernos", label: "Cadernos" },
  { href: "/produtos?categoria=planner", label: "Planners" },
  { href: "/produtos?categoria=presentes", label: "Presentes" },
  { href: "/produtos?categoria=canetas", label: "Escrita" },
];

export function StoreHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[color-mix(in_srgb,var(--mqm-olive-200)_45%,transparent)] bg-[color-mix(in_srgb,var(--mqm-warm-50)_92%,transparent)]/95 backdrop-blur-lg supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--mqm-warm-50)_94%,transparent)]/95">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-[6.4rem] items-center justify-between md:hidden">
          <Link href="/" className="group flex items-center gap-3 leading-none sm:gap-4">
            <Image
              src="/images.png"
              alt="Logo Mais que Mimo"
              width={64}
              height={64}
              priority
              className="h-12 w-12 rounded-full object-cover shadow-[var(--shadow-sm)]"
            />
            <span className="font-display text-[1.55rem] font-semibold text-primary tracking-[0.01em]">
              mais que mimo
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon-sm" asChild aria-label="Buscar">
              <Link href="/busca">
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

        <div className="hidden pb-5 pt-4 md:block">
          <div className="flex items-center justify-center">
            <Link href="/" className="group flex items-center gap-4 leading-none">
              <Image
                src="/images.png"
                alt="Logo Mais que Mimo"
                width={84}
                height={84}
                priority
                className="h-[4.7rem] w-[4.7rem] rounded-full object-cover shadow-[var(--shadow-md)]"
              />
              <span className="flex flex-col">
                <span className="font-display text-[2.1rem] font-semibold text-primary tracking-[0.01em]">
                  mais que mimo
                </span>
                <span className="text-[11px] text-muted-foreground tracking-[0.16em] uppercase transition-colors group-hover:text-primary">
                  papelaria . afeto . cuidado
                </span>
              </span>
            </Link>
          </div>

          <div className="mt-4 flex items-center justify-between gap-6">
            <nav className="flex items-center gap-2" aria-label="Navegação principal">
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

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon-sm" asChild aria-label="Buscar">
                <Link href="/busca">
                  <Search className="size-5" />
                </Link>
              </Button>

              <Button variant="ghost" size="icon-sm" asChild aria-label="Favoritos" className="inline-flex">
                <Link href="/conta/favoritos">
                  <Heart className="size-5" />
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
