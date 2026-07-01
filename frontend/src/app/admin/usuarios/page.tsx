"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Pencil, Trash2, Shield, Eye, EyeOff } from "lucide-react";

interface MockAdmin {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "MANAGER" | "EDITOR";
  isActive: boolean;
}

const initialAdmins: MockAdmin[] = [
  {
    id: "1",
    name: "Victor Hugo",
    email: "victor@maisquemimo.com.br",
    role: "SUPER_ADMIN",
    isActive: true,
  },
  {
    id: "2",
    name: "Maria Flor",
    email: "maria@maisquemimo.com.br",
    role: "MANAGER",
    isActive: true,
  },
  {
    id: "3",
    name: "Ana Design",
    email: "ana.design@email.com",
    role: "EDITOR",
    isActive: false,
  },
];

const roleLabels: Record<MockAdmin["role"], string> = {
  SUPER_ADMIN: "Administrador Geral",
  MANAGER: "Gerente de Pedidos",
  EDITOR: "Editor de Conteúdo",
};

const roleVariant: Record<MockAdmin["role"], "default" | "secondary" | "outline"> = {
  SUPER_ADMIN: "default",
  MANAGER: "secondary",
  EDITOR: "outline",
};

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [admins, setAdmins] = useState<MockAdmin[]>(initialAdmins);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<MockAdmin | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<MockAdmin["role"]>("EDITOR");
  const [isActive, setIsActive] = useState(true);

  const filteredAdmins = admins.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
  );

  function openCreateDialog() {
    setEditingAdmin(null);
    setName("");
    setEmail("");
    setRole("EDITOR");
    setIsActive(true);
    setIsDialogOpen(true);
  }

  function openEditDialog(admin: MockAdmin) {
    setEditingAdmin(admin);
    setName(admin.name);
    setEmail(admin.email);
    setRole(admin.role);
    setIsActive(admin.isActive);
    setIsDialogOpen(true);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (editingAdmin) {
      // Edit
      setAdmins(
        admins.map((a) =>
          a.id === editingAdmin.id ? { ...a, name, email, role, isActive } : a
        )
      );
      toast({ title: "Sucesso", description: "Usuário atualizado com sucesso!" });
    } else {
      // Create
      const newAdmin: MockAdmin = {
        id: (admins.length + 1).toString(),
        name,
        email,
        role,
        isActive,
      };
      setAdmins([...admins, newAdmin]);
      toast({ title: "Sucesso", description: "Usuário criado com sucesso!" });
    }

    setIsDialogOpen(false);
  }

  function handleDelete(id: string) {
    if (confirm("Tem certeza que deseja remover este administrador?")) {
      setAdmins(admins.filter((a) => a.id !== id));
      toast({ title: "Sucesso", description: "Usuário removido com sucesso!" });
    }
  }

  function toggleStatus(id: string) {
    setAdmins(
      admins.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
    const updated = admins.find((a) => a.id === id);
    toast({
      title: "Usuário atualizado",
      description: `Status de ${updated?.name} alterado para ${!updated?.isActive ? "Ativo" : "Inativo"}.`,
    });
  }

  return (
    <div className="space-y-6 select-none font-sans pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-foreground">Usuários Administrativos</h1>
          <p className="text-muted-foreground text-sm">Gerencie quem tem acesso ao painel gerencial da loja</p>
        </div>
        <Button onClick={openCreateDialog} className="cursor-pointer">
          <Plus className="size-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou e-mail..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users Table */}
      <div className="rounded-[var(--radius-xl)] border border-border/80 bg-card shadow-[var(--shadow-sm)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" aria-label="Tabela de usuários administrativos">
            <thead>
              <tr className="border-b bg-muted/35">
                <th className="px-6 py-4 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wider">Nome</th>
                <th className="px-6 py-4 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wider">E-mail</th>
                <th className="px-6 py-4 text-center font-semibold text-xs text-muted-foreground uppercase tracking-wider">Nível de Acesso</th>
                <th className="px-6 py-4 text-center font-semibold text-xs text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right font-semibold text-xs text-muted-foreground uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-accent/45 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--mqm-olive-100)] text-[var(--mqm-olive-700)]">
                        <Shield className="size-3.5" />
                      </div>
                      <p className="font-semibold text-foreground text-sm">{admin.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge variant={roleVariant[admin.role]} className="font-bold text-[9px] uppercase tracking-wider">
                      {roleLabels[admin.role]}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleStatus(admin.id)}
                      className="cursor-pointer focus:outline-none"
                    >
                      <Badge variant={admin.isActive ? "default" : "secondary"}>
                        {admin.isActive ? "Ativo" : "Inativo"}
                      </Badge>
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(admin)}
                        className="cursor-pointer"
                      >
                        <Pencil className="size-3.5 text-muted-foreground" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={admin.role === "SUPER_ADMIN"}
                        onClick={() => handleDelete(admin.id)}
                        className="cursor-pointer"
                        title={admin.role === "SUPER_ADMIN" ? "Não é possível deletar o administrador principal" : "Deletar usuário"}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredAdmins.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground text-sm">
                    Nenhum usuário administrativo encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog for Admin Editor */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md select-none font-sans">
          <DialogHeader>
            <DialogTitle>
              {editingAdmin ? "Editar Usuário" : "Adicionar Novo Usuário"}
            </DialogTitle>
            <DialogDescription>
              Defina as credenciais e nível de acesso do usuário.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="usrName">Nome *</Label>
              <Input
                id="usrName"
                placeholder="Ex: Pedro Fonseca"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="usrEmail">E-mail de Acesso *</Label>
              <Input
                id="usrEmail"
                type="email"
                placeholder="Ex: pedro@maisquemimo.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="usrRole">Nível de Acesso *</Label>
              <select
                id="usrRole"
                value={role}
                onChange={(e) => setRole(e.target.value as MockAdmin["role"])}
                className="w-full h-10 rounded-[var(--radius-lg)] border border-input bg-background/85 px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring transition-all"
              >
                <option value="SUPER_ADMIN">Administrador Geral</option>
                <option value="MANAGER">Gerente de Pedidos</option>
                <option value="EDITOR">Editor de Conteúdo</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2 cursor-pointer select-none">
              <input
                id="usrActive"
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 focus:ring-[var(--mqm-blush-400)]"
              />
              <Label htmlFor="usrActive" className="cursor-pointer text-sm">Permitir login imediato</Label>
            </div>

            <DialogFooter className="pt-4 gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="cursor-pointer">
                Cancelar
              </Button>
              <Button type="submit" className="cursor-pointer">
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
