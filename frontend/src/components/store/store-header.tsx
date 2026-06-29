"use client";

import Link from "next/link";
import { ShoppingBag, Search, Heart, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/produtos", label: "Produtos" },
  { href: "/produtos?categoria=cadernos", label: "Cadernos" },
  { href: "/produtos?categoria=adesivos", label: "Adesivos" },
  { href: "/produtos?categoria=planner", label: "Planner" },
  { href: "/produtos?categoria=presentes", label: "Presentes" },
];

export function StoreHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-xl font-semibold text-[var(--mqm-rose-600)] tracking-tight">
            mais que mimo
          </span>
          <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
            papelaria afetiva
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" asChild aria-label="Buscar">
            <Link href="/busca">
              <Search className="size-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon-sm" asChild aria-label="Favoritos">
            <Link href="/conta/favoritos">
              <Heart className="size-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon-sm" asChild aria-label="Minha conta">
            <Link href="/conta">
              <User className="size-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon-sm" asChild aria-label={`Carrinho (${itemCount} itens)`} className="relative">
            <Link href="/carrinho">
              <ShoppingBag className="size-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
          </Button>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          menuOpen ? "max-h-96 border-t border-border" : "max-h-0"
        )}
      >
        <nav
          className="flex flex-col gap-1 bg-background px-4 py-3"
          aria-label="Navegação mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
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
