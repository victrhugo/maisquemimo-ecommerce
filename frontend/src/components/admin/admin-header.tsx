"use client";

import { Bell, Search, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

// TODO: substituir pelo usuário real do contexto de auth
const mockUser = { name: "Admin Mimo", email: "admin@maisquemimo.com.br" };

export function AdminHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      {/* Search */}
      <div className="flex w-full max-w-xs items-center gap-2">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            placeholder="Buscar..."
            className="pl-9 text-sm h-9"
            aria-label="Busca no painel"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon-sm" aria-label="Notificações" className="relative">
          <Bell className="size-4" />
          <span
            className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--mqm-rose-500)]"
            aria-label="Há notificações não lidas"
          />
        </Button>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(mockUser.name)}</AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-xs font-medium text-foreground">{mockUser.name}</span>
            <span className="text-[10px] text-muted-foreground">{mockUser.email}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
