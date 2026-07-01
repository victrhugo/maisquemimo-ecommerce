"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAdminCategories, useCreateCategory, useDeleteCategory, useUpdateCategory } from "@/hooks/use-categories";
import type { Category } from "@/types/category";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

export default function AdminCategoriesPage() {
  const { toast } = useToast();
  const { data: categoriesData } = useAdminCategories();
  const { mutateAsync: createCategory } = useCreateCategory();
  const { mutateAsync: updateCategory } = useUpdateCategory();
  const { mutateAsync: deleteCategory } = useDeleteCategory();

  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [order, setOrder] = useState(0);

  const categories = categoriesData ?? [];

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  function openCreateDialog() {
    setEditingCategory(null);
    setName("");
    setDescription("");
    setSlug("");
    setImageSrc("/images/placeholder-hero.svg");
    setOrder(categories.length + 1);
    setIsDialogOpen(true);
  }

  function openEditDialog(category: Category) {
    setEditingCategory(category);
    setName(category.name);
    setDescription(category.description || "");
    setSlug(category.slug);
    setImageSrc(category.imageUrl || "/images/placeholder-hero.svg");
    setOrder(categories.indexOf(category) + 1);
    setIsDialogOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (editingCategory) {
      await updateCategory({
        id: editingCategory.id,
        payload: { name, slug, description, imageUrl: imageSrc, active: editingCategory.active },
      });
      toast({ title: "Sucesso", description: "Categoria atualizada com sucesso!" });
    } else {
      await createCategory({ name, slug, description, imageUrl: imageSrc, active: true });
      toast({ title: "Sucesso", description: "Categoria criada com sucesso!" });
    }

    setIsDialogOpen(false);
  }

  async function handleDelete(id: string) {
    if (confirm("Tem certeza que deseja remover esta categoria?")) {
      await deleteCategory(id);
      toast({ title: "Sucesso", description: "Categoria excluída com sucesso!" });
    }
  }

  return (
    <div className="space-y-6 select-none font-sans">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-foreground">Categorias</h1>
          <p className="text-muted-foreground text-sm">Gerencie as categorias de exibição da loja</p>
        </div>
        <Button onClick={openCreateDialog} className="cursor-pointer">
          <Plus className="size-4 mr-2" />
          Nova Categoria
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Buscar categorias..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories Grid Table */}
      <div className="rounded-[var(--radius-xl)] border border-border/80 bg-card shadow-[var(--shadow-sm)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" aria-label="Tabela de categorias">
            <thead>
              <tr className="border-b bg-muted/35">
                <th className="px-6 py-4 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wider">Miniatura</th>
                <th className="px-6 py-4 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wider">Nome</th>
                <th className="px-6 py-4 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wider">Slug</th>
                <th className="px-6 py-4 text-center font-semibold text-xs text-muted-foreground uppercase tracking-wider">Link Relativo</th>
                <th className="px-6 py-4 text-right font-semibold text-xs text-muted-foreground uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCategories.map((c) => (
                <tr key={c.id} className="hover:bg-accent/45 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-[color-mix(in_srgb,var(--border)_45%,transparent)] bg-[var(--mqm-warm-100)]">
                      <Image
                        src={c.imageUrl || "/images/placeholder-hero.svg"}
                        alt={c.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground text-sm">{c.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded">
                      {c.slug}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs font-semibold text-[var(--mqm-olive-700)] hover:underline cursor-pointer">
                      {`/produtos?categoria=${c.id}`}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(c)}
                        className="cursor-pointer"
                      >
                        <Pencil className="size-3.5 text-muted-foreground" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(c.id)}
                        className="cursor-pointer"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground text-sm">
                    Nenhuma categoria encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog for Creation/Edition */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md select-none font-sans">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Editar Categoria" : "Criar Nova Categoria"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados da categoria para organizar seus produtos na loja.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="catName">Nome da Categoria *</Label>
              <Input
                id="catName"
                placeholder="Ex: Cadernos Costurados"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="catSlug">Slug (Identificador na URL) *</Label>
              <Input
                id="catSlug"
                placeholder="ex: cadernos-costurados"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="catDesc">Descrição da Categoria</Label>
              <textarea
                id="catDesc"
                placeholder="Descreva o que o cliente encontrará nesta categoria..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-[var(--radius-lg)] border border-input bg-background/85 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-[var(--motion-fast)] ease-[var(--ease-brand)] focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="catImage">URL da Imagem</Label>
              <Input
                id="catImage"
                placeholder="https://exemplo.com/imagem.jpg"
                value={imageSrc}
                onChange={(e) => setImageSrc(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="catOrder">Ordem de Exibição</Label>
              <Input
                id="catOrder"
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
              />
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
