"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthSession } from "@/hooks/use-auth";
import { useCartStore } from "@/stores/cart-store";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/produtos", label: "Todos os produtos" },
  { href: "/produtos?categoria=cadernos", label: "Cadernos" },
  { href: "/produtos?categoria=planner", label: "Planners" },
  { href: "/produtos?categoria=presentes", label: "Presentes" },
  { href: "/produtos?categoria=canetas", label: "Escrita" },
  { href: "/produtos?categoria=kits", label: "Kits" },
];

export function StoreHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, isAdmin, logout } = useAuthSession();
  const itemCount = useCartStore((s) => s.itemCount);
  const { setCartOpen } = useUIStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[color-mix(in_srgb,var(--mqm-olive-200)_35%,transparent)] bg-[color-mix(in_srgb,var(--mqm-warm-50)_96%,white)]/95 backdrop-blur-md">
      {/* Announcement Bar */}
      <div className="w-full bg-[color-mix(in_srgb,var(--mqm-blush-100)_80%,white)] py-2 px-4 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--mqm-olive-800)] border-b border-[color-mix(in_srgb,var(--border)_35%,transparent)] select-none">
        DETALHES QUE TRAZEM LEVEZA E CARINHO AO SEU DIA A DIA ♡
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        {/* Mobile Header */}
        <div className="flex h-20 items-center justify-between md:hidden">
          <Link href="/" className="group flex items-center gap-2.5 leading-none select-none">
            <Image
              src="/images.png"
              alt="Logo Mais que Mimo"
              width={48}
              height={48}
              priority
              className="h-11 w-11 rounded-full object-cover border border-[color-mix(in_srgb,var(--border)_45%,transparent)]"
            />
            <div className="flex flex-col">
              <span className="font-display text-[1.15rem] font-bold text-[var(--mqm-olive-800)] tracking-[0.01em] uppercase">
                mais que mimo
              </span>
              <span className="font-cursive text-[10px] text-[var(--mqm-blush-600)] leading-none mt-0.5 font-semibold">
                papelaria afetiva
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon-sm" asChild aria-label="Buscar produtos">
              <Link href="/produtos">
                <Search className="size-4.5 text-[var(--mqm-olive-800)]" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setCartOpen(true)}
              aria-label={`Carrinho (${itemCount} itens)`}
              className="relative cursor-pointer"
            >
              <ShoppingBag className="size-4.5 text-[var(--mqm-olive-800)]" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--mqm-blush-600)] text-[8px] font-bold text-white shadow-[var(--shadow-xs)]">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="size-4.5 text-[var(--mqm-olive-800)]" /> : <Menu className="size-4.5 text-[var(--mqm-olive-800)]" />}
            </Button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden h-24 items-center justify-between gap-6 md:flex">
          <Link href="/" className="group flex items-center gap-3.5 leading-none select-none shrink-0">
            <Image
              src="/images.png"
              alt="Logo Mais que Mimo"
              width={64}
              height={64}
              priority
              className="h-[52px] w-[52px] rounded-full object-cover border border-[color-mix(in_srgb,var(--border)_45%,transparent)] transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="flex flex-col">
              <span className="font-display text-[1.4rem] font-bold text-[var(--mqm-olive-800)] tracking-[0.02em] uppercase group-hover:text-[var(--mqm-olive-600)] transition-colors duration-200">
                mais que mimo
              </span>
              <span className="font-cursive text-xs text-[var(--mqm-blush-600)] leading-none mt-0.5 font-semibold">
                papelaria afetiva
              </span>
            </div>
          </Link>

          {/* Navigation links - uppercase, tracking-wider, clean */}
          <nav className="flex flex-1 items-center justify-center gap-1.5 flex-wrap" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--mqm-olive-800)] transition-colors duration-[var(--motion-fast)] hover:bg-[var(--mqm-blush-100)]/60 hover:text-[var(--mqm-blush-700)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-1 shrink-0">
            <Button variant="ghost" size="icon-sm" asChild aria-label="Buscar produtos">
              <Link href="/produtos" className="hover:scale-105 transition-transform">
                <Search className="size-4.5 text-[var(--mqm-olive-800)]" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon-sm" asChild aria-label="Minha conta" className="inline-flex hover:scale-105 transition-transform">
              <Link href={isAuthenticated ? '/conta' : '/login'}>
                <User className="size-4.5 text-[var(--mqm-olive-800)]" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setCartOpen(true)}
              aria-label={`Carrinho (${itemCount} itens)`}
              className="relative hover:scale-105 transition-transform cursor-pointer"
            >
              <ShoppingBag className="size-4.5 text-[var(--mqm-olive-800)]" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--mqm-blush-600)] text-[8px] font-bold text-white shadow-[var(--shadow-xs)]">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden bg-[var(--mqm-warm-100)] border-t border-[color-mix(in_srgb,var(--border)_45%,transparent)]",
          menuOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <nav
          className="mx-4 my-3 flex flex-col gap-0.5 rounded-[var(--radius-md)] bg-[var(--mqm-warm-50)] p-2 border border-[color-mix(in_srgb,var(--border)_35%,transparent)] shadow-[var(--shadow-xs)]"
          aria-label="Navegação mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[var(--radius-sm)] px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--mqm-olive-800)] hover:bg-[var(--mqm-blush-100)]/60 hover:text-[var(--mqm-blush-700)]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="my-2 h-px bg-[color-mix(in_srgb,var(--border)_55%,transparent)]" />

          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="rounded-[var(--radius-sm)] px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--mqm-olive-800)] hover:bg-[var(--mqm-blush-100)]/60 hover:text-[var(--mqm-blush-700)]"
                onClick={() => setMenuOpen(false)}
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="rounded-[var(--radius-sm)] px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--mqm-olive-800)] hover:bg-[var(--mqm-blush-100)]/60 hover:text-[var(--mqm-blush-700)]"
                onClick={() => setMenuOpen(false)}
              >
                Cadastrar
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/conta"
                className="rounded-[var(--radius-sm)] px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--mqm-olive-800)] hover:bg-[var(--mqm-blush-100)]/60 hover:text-[var(--mqm-blush-700)]"
                onClick={() => setMenuOpen(false)}
              >
                Minha Conta
              </Link>
              <Link
                href="/conta"
                className="rounded-[var(--radius-sm)] px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--mqm-olive-800)] hover:bg-[var(--mqm-blush-100)]/60 hover:text-[var(--mqm-blush-700)]"
                onClick={() => setMenuOpen(false)}
              >
                Meus Pedidos
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="rounded-[var(--radius-sm)] px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--mqm-olive-800)] hover:bg-[var(--mqm-blush-100)]/60 hover:text-[var(--mqm-blush-700)]"
                  onClick={() => setMenuOpen(false)}
                >
                  Painel Administrativo
                </Link>
              )}
              <button
                type="button"
                className="rounded-[var(--radius-sm)] px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--mqm-olive-800)] hover:bg-[var(--mqm-blush-100)]/60 hover:text-[var(--mqm-blush-700)]"
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
              >
                Sair
              </button>
            </>
          )}
        </nav>
      </div>

      <div className="hidden border-t border-[color-mix(in_srgb,var(--border)_45%,transparent)] bg-[color-mix(in_srgb,var(--mqm-warm-50)_92%,white)] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--mqm-olive-700)] md:block">
        <div className="container mx-auto flex items-center justify-end gap-4 px-4 sm:px-6">
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="hover:text-[var(--mqm-blush-700)]">Entrar</Link>
              <Link href="/cadastro" className="hover:text-[var(--mqm-blush-700)]">Cadastrar</Link>
            </>
          ) : (
            <>
              <Link href="/conta" className="hover:text-[var(--mqm-blush-700)]">Minha Conta</Link>
              <Link href="/conta" className="hover:text-[var(--mqm-blush-700)]">Meus Pedidos</Link>
              {isAdmin && <Link href="/admin" className="hover:text-[var(--mqm-blush-700)]">Painel Administrativo</Link>}
              <button type="button" className="hover:text-[var(--mqm-blush-700)]" onClick={handleLogout}>Sair</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
