"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Warehouse,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/produtos", icon: Package, label: "Produtos" },
  { href: "/admin/pedidos", icon: ShoppingBag, label: "Pedidos" },
  { href: "/admin/clientes", icon: Users, label: "Clientes" },
  { href: "/admin/estoque", icon: Warehouse, label: "Estoque" },
  { href: "/admin/configuracoes", icon: Settings, label: "Configurações" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
      aria-label="Navegação administrativa"
    >
      {/* Logo */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-border px-4",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        {!collapsed && (
          <Link href="/dashboard" className="flex flex-col leading-none">
            <span className="font-display text-base font-semibold text-[var(--mqm-rose-600)]">
              mais que mimo
            </span>
            <span className="text-[9px] text-muted-foreground tracking-widest uppercase">
              admin
            </span>
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard" aria-label="Mais que Mimo Admin">
            <span className="font-display text-lg font-bold text-[var(--mqm-rose-500)]">M</span>
          </Link>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 p-2 pt-4">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                active
                  ? "bg-[var(--mqm-rose-100)] text-[var(--mqm-rose-700)]"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon
                className={cn("shrink-0", active ? "size-5" : "size-4")}
                aria-hidden="true"
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm hover:text-foreground transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="size-3.5" />
        ) : (
          <ChevronLeft className="size-3.5" />
        )}
      </button>

      {/* Bottom: store link */}
      <div className={cn("border-t border-border p-3", collapsed && "flex justify-center")}>
        <Link
          href="/"
          target="_blank"
          rel="noopener"
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground",
            collapsed && "justify-center px-2"
          )}
        >
          <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          {!collapsed && "Ver loja"}
        </Link>
      </div>
    </aside>
  );
}
