"use client";

import { useEffect, useMemo, useState } from "react";
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
import { useAllProductsAdmin } from "@/hooks/use-products";
import { useContent, useSaveContent } from "@/hooks/use-admin";
import type { Category } from "@/types/category";
import { uploadImages } from "@/services/image-upload";
import { slugify } from "@/lib/utils";
import { ArrowDown, ArrowUp, Plus, Search, Pencil, Power, Trash2 } from "lucide-react";
import Image from "next/image";

export default function AdminCategoriesPage() {
  const { toast } = useToast();
  const { data: categoriesData } = useAdminCategories();
  const { data: productsData } = useAllProductsAdmin();
  const { data: orderContent } = useContent("categories-order");
  const { mutateAsync: saveOrderContent } = useSaveContent("categories-order");
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
  const [slugDirty, setSlugDirty] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [order, setOrder] = useState(0);
  const [active, setActive] = useState(true);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const categories = categoriesData ?? [];
  const allProducts = productsData ?? [];

  const productsCountByCategory = useMemo(() => {
    const map = new Map<string, number>();
    allProducts.forEach((product) => {
      map.set(product.categoryId, (map.get(product.categoryId) ?? 0) + 1);
    });
    return map;
  }, [allProducts]);

  const persistedOrder = useMemo(() => {
    if (!orderContent?.payload) {
      return {} as Record<string, number>;
    }

    try {
      const parsed = JSON.parse(orderContent.payload);
      return parsed?.orderById ?? {};
    } catch {
      return {} as Record<string, number>;
    }
  }, [orderContent?.payload]);

  const orderedCategories = useMemo(() => {
    return [...categories]
      .sort((a, b) => {
        const aOrder = persistedOrder[a.id] ?? Number.MAX_SAFE_INTEGER;
        const bOrder = persistedOrder[b.id] ?? Number.MAX_SAFE_INTEGER;
        if (aOrder !== bOrder) {
          return aOrder - bOrder;
        }
        return a.name.localeCompare(b.name, "pt-BR");
      })
      .map((category, index) => ({
        ...category,
        displayOrder: persistedOrder[category.id] ?? index + 1,
        productsCount: productsCountByCategory.get(category.id) ?? 0,
      }));
  }, [categories, persistedOrder, productsCountByCategory]);

  const filteredCategories = orderedCategories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!name.trim() || slugDirty) {
      return;
    }
    setSlug(slugify(name));
  }, [name, slugDirty]);

  useEffect(() => {
    if (editingCategory) {
      return;
    }
    setOrder((filteredCategories.length || 0) + 1);
  }, [filteredCategories.length, editingCategory]);

  async function persistOrder(nextCategories: Array<Category & { displayOrder?: number }>) {
    const orderById = nextCategories.reduce<Record<string, number>>((acc, category, index) => {
      acc[category.id] = index + 1;
      return acc;
    }, {});

    await saveOrderContent(JSON.stringify({ orderById }));
  }

  function reorderByTargetPosition(list: Array<Category & { displayOrder?: number }>, id: string, targetOrder: number) {
    const current = [...list];
    const fromIndex = current.findIndex((category) => category.id === id);
    if (fromIndex < 0) {
      return current;
    }

    const [item] = current.splice(fromIndex, 1);
    const clampedIndex = Math.max(0, Math.min(targetOrder - 1, current.length));
    current.splice(clampedIndex, 0, item);
    return current;
  }

  async function moveCategory(id: string, direction: "up" | "down") {
    const list = [...orderedCategories];
    const index = list.findIndex((category) => category.id === id);
    if (index < 0) {
      return;
    }

    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= list.length) {
      return;
    }

    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;
    await persistOrder(list);
  }

  async function handleImageUpload(files: FileList | null) {
    if (!files || files.length === 0) {
      return;
    }

    setIsUploadingImage(true);
    try {
      const urls = await uploadImages(Array.from(files));
      if (urls.length === 0) {
        throw new Error("Nenhuma imagem processada");
      }
      setImageSrc(urls[0]);
    } catch {
      toast({
        title: "Falha no upload",
        description: "Não foi possível carregar a imagem da categoria.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingImage(false);
    }
  }

  function openCreateDialog() {
    setEditingCategory(null);
    setName("");
    setDescription("");
    setSlug("");
    setSlugDirty(false);
    setImageSrc("/images/placeholder-hero.svg");
    setOrder(orderedCategories.length + 1);
    setActive(true);
    setIsDialogOpen(true);
  }

  function openEditDialog(category: Category) {
    setEditingCategory(category);
    setName(category.name);
    setDescription(category.description || "");
    setSlug(category.slug);
    setSlugDirty(true);
    setImageSrc(category.imageUrl || "/images/placeholder-hero.svg");
    setOrder(category.displayOrder || 1);
    setActive(category.active);
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
      const updated = await updateCategory({
        id: editingCategory.id,
        payload: { name, slug, description, imageUrl: imageSrc, active },
      });

      await persistOrder(reorderByTargetPosition(
        orderedCategories.map((category) => (category.id === updated.id ? { ...category, ...updated } : category)),
        updated.id,
        order
      ));

      toast({ title: "Sucesso", description: "Categoria atualizada com sucesso!" });
    } else {
      const created = await createCategory({ name, slug, description, imageUrl: imageSrc, active });
      const nextOrdered = reorderByTargetPosition([
        ...orderedCategories,
        {
          ...created,
          displayOrder: order,
        },
      ], created.id, order);

      await persistOrder(nextOrdered);
      toast({ title: "Sucesso", description: "Categoria criada com sucesso!" });
    }

    setIsDialogOpen(false);
  }

  async function toggleCategoryStatus(category: Category) {
    await updateCategory({
      id: category.id,
      payload: {
        name: category.name,
        slug: category.slug,
        description: category.description || "",
        imageUrl: category.imageUrl || "/images/placeholder-hero.svg",
        active: !category.active,
      },
    });

    toast({
      title: "Status atualizado",
      description: `${category.name} foi ${category.active ? "inativada" : "ativada"}.`,
    });
  }

  async function handleDelete(id: string) {
    if (confirm("Tem certeza que deseja remover esta categoria?")) {
      await deleteCategory(id);
      await persistOrder(orderedCategories.filter((category) => category.id !== id));
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
                <th className="px-6 py-4 text-left font-semibold text-xs text-muted-foreground uppercase tracking-wider">Quantidade de produtos</th>
                <th className="px-6 py-4 text-center font-semibold text-xs text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-center font-semibold text-xs text-muted-foreground uppercase tracking-wider">Ordem</th>
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
                    <p className="text-xs text-muted-foreground font-mono mt-1">{c.slug}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{c.productsCount ?? 0}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${c.active ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
                      {c.active ? "Ativa" : "Inativa"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs font-semibold text-[var(--mqm-olive-700)]">
                      {c.displayOrder}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => moveCategory(c.id, "up")}
                        className="cursor-pointer"
                      >
                        <ArrowUp className="size-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => moveCategory(c.id, "down")}
                        className="cursor-pointer"
                      >
                        <ArrowDown className="size-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleCategoryStatus(c)}
                        className="cursor-pointer"
                      >
                        <Power className="size-3.5 text-muted-foreground" />
                      </Button>
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
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground text-sm">
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
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugDirty(true);
                }}
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
              <Label htmlFor="catImage">Imagem da Categoria</Label>
              <div className="space-y-2">
                <Input
                  id="catImage"
                  type="file"
                  accept="image/*"
                  onChange={(event) => void handleImageUpload(event.target.files)}
                  disabled={isUploadingImage}
                />
                <p className="text-xs text-muted-foreground">{isUploadingImage ? "Enviando imagem..." : "Você pode selecionar ou arrastar uma imagem."}</p>
                {imageSrc && (
                  <div className="relative h-24 w-24 overflow-hidden rounded-lg border border-border/70 bg-muted/40">
                    <Image src={imageSrc} alt="Preview da categoria" fill className="object-cover" />
                  </div>
                )}
              </div>
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

            <div className="flex items-center gap-2">
              <input
                id="catActive"
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="catActive">Categoria ativa</Label>
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

      {orderedCategories.length === 0 && (
        <div className="rounded-[var(--radius-xl)] border border-border/80 bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">Nenhuma categoria cadastrada.</p>
          <Button className="mt-3" onClick={openCreateDialog}>Criar categoria</Button>
        </div>
      )}
    </div>
  );
}
