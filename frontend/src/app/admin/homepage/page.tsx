"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/use-products";
import { useContent, useSaveContent } from "@/hooks/use-admin";
import { ArrowUp, ArrowDown, Eye, EyeOff, Save, Image as ImageIcon } from "lucide-react";

interface HomepageSection {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  isVisible: boolean;
  imageSrc?: string;
  selectedProductIds?: string[];
}

const emptySections: HomepageSection[] = [
  {
    id: "hero",
    name: "Destaque (Hero)",
    title: "Organize a rotina com delicadeza.",
    subtitle: "Produtos artesanais com design minimalista criados para trazer leveza e afeto.",
    isVisible: true,
    imageSrc: "/images/placeholder-hero.svg",
  },
  {
    id: "categorias",
    name: "Categorias",
    title: "Categorias",
    subtitle: "Navegue pelos setores da loja",
    isVisible: true,
  },
  {
    id: "lancamentos",
    name: "Lançamentos",
    title: "Lançamentos",
    subtitle: "Confira as novidades em papelaria",
    isVisible: true,
    selectedProductIds: ["prd-1", "prd-2", "prd-4", "prd-7"],
  },
  {
    id: "mais-vendidos",
    name: "Mais Vendidos",
    title: "Mais vendidos",
    subtitle: "Os queridinhos da papelaria afetiva",
    isVisible: true,
    selectedProductIds: ["prd-1", "prd-2", "prd-3", "prd-5", "prd-6", "prd-8"],
  },
  {
    id: "colecoes",
    name: "Coleções",
    title: "Coleções",
    subtitle: "Nossas coleções especiais de linho e papel pólen",
    isVisible: true,
  },
  {
    id: "newsletter",
    name: "Newsletter",
    title: "Assine nossa Newsletter",
    subtitle: "Receba novidades exclusivas e mimos na sua caixa de entrada",
    isVisible: true,
  },
];

export default function AdminHomepageEditor() {
  const { toast } = useToast();
  const { data: productsData } = useProducts(0, 100);
  const { data: content } = useContent("homepage");
  const { mutateAsync: saveContent } = useSaveContent("homepage");
  const [sections, setSections] = useState<HomepageSection[]>([]);

  const products = productsData?.content ?? [];

  useEffect(() => {
    if (!content) {
      return;
    }

    try {
      const parsed = JSON.parse(content.payload);
      setSections(Array.isArray(parsed.sections) ? parsed.sections : emptySections);
    } catch {
      setSections(emptySections);
    }
  }, [content]);

  async function handleSave() {
    await saveContent(JSON.stringify({ sections }));
    toast({
      title: "Homepage Salva",
      description: "As alterações da página inicial foram salvas com sucesso.",
    });
  }

  function toggleVisibility(id: string) {
    setSections(
      sections.map((s) => (s.id === id ? { ...s, isVisible: !s.isVisible } : s))
    );
  }

  function handleFieldChange(id: string, field: keyof HomepageSection, value: any) {
    setSections(
      sections.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  }

  function moveSection(index: number, direction: "up" | "down") {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;

    const list = [...sections];
    const temp = list[index];
    list[index] = list[newIndex];
    list[newIndex] = temp;
    setSections(list);
  }

  function handleProductToggle(sectionId: string, productId: string) {
    setSections(
      sections.map((s) => {
        if (s.id !== sectionId) return s;
        const currentIds = s.selectedProductIds || [];
        const updatedIds = currentIds.includes(productId)
          ? currentIds.filter((id) => id !== productId)
          : [...currentIds, productId];
        return { ...s, selectedProductIds: updatedIds };
      })
    );
  }

  return (
    <div className="space-y-6 select-none font-sans pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-foreground">Editor da Homepage</h1>
          <p className="text-muted-foreground text-sm">Organize e personalize as seções exibidas na página inicial</p>
        </div>
        <Button onClick={handleSave} className="cursor-pointer">
          <Save className="size-4 mr-2" />
          Salvar Homepage
        </Button>
      </div>

      {/* Sections List */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <Card key={section.id} className={!section.isVisible ? "opacity-60 bg-muted/20" : ""}>
            <CardHeader className="flex flex-row items-start justify-between border-b pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base font-bold uppercase tracking-wider text-[var(--mqm-olive-800)]">
                    {section.name}
                  </CardTitle>
                  {!section.isVisible && (
                    <Badge variant="secondary" className="text-[9px] uppercase tracking-wider font-bold">Oculto</Badge>
                  )}
                </div>
                <CardDescription className="text-xs">
                  Ajuste a disposição e textos da seção {section.name}
                </CardDescription>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleVisibility(section.id)}
                  title={section.isVisible ? "Ocultar seção" : "Exibir seção"}
                  className="cursor-pointer h-8 w-8 p-0"
                >
                  {section.isVisible ? <Eye className="size-4" /> : <EyeOff className="size-4 text-muted-foreground" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={index === 0}
                  onClick={() => moveSection(index, "up")}
                  className="cursor-pointer h-8 w-8 p-0"
                >
                  <ArrowUp className="size-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={index === sections.length - 1}
                  onClick={() => moveSection(index, "down")}
                  className="cursor-pointer h-8 w-8 p-0"
                >
                  <ArrowDown className="size-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor={`${section.id}-title`} className="text-xs">Título da Seção</Label>
                  <Input
                    id={`${section.id}-title`}
                    value={section.title}
                    onChange={(e) => handleFieldChange(section.id, "title", e.target.value)}
                    disabled={!section.isVisible}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`${section.id}-subtitle`} className="text-xs">Subtítulo da Seção</Label>
                  <Input
                    id={`${section.id}-subtitle`}
                    value={section.subtitle}
                    onChange={(e) => handleFieldChange(section.id, "subtitle", e.target.value)}
                    disabled={!section.isVisible}
                  />
                </div>
              </div>

              {/* Hero Specific Fields (Image Banner) */}
              {section.id === "hero" && (
                <div className="space-y-1.5 border-t pt-4">
                  <Label className="text-xs flex items-center gap-1.5">
                    <ImageIcon className="size-3.5 text-muted-foreground" />
                    <span>Imagem Destaque (Desktop/Mobile)</span>
                  </Label>
                  <Input
                    value={section.imageSrc}
                    onChange={(e) => handleFieldChange(section.id, "imageSrc", e.target.value)}
                    placeholder="URL da imagem destaque"
                    disabled={!section.isVisible}
                  />
                </div>
              )}

              {/* Product Display Selector (Lançamentos / Mais vendidos) */}
              {section.selectedProductIds && (
                <div className="space-y-2 border-t pt-4">
                  <Label className="text-xs">Produtos Exibidos nesta Seção</Label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 max-h-48 overflow-y-auto border p-3 rounded-lg bg-background">
                    {products.map((p) => {
                      const isSelected = section.selectedProductIds?.includes(p.id);
                      return (
                        <label
                          key={p.id}
                          className={`flex items-center gap-2 rounded-md border p-2 text-xs font-semibold select-none cursor-pointer transition-all ${
                            isSelected
                              ? "bg-[var(--mqm-blush-100)] border-[var(--mqm-blush-300)] text-[var(--mqm-blush-800)]"
                              : "hover:bg-muted/40 text-foreground"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleProductToggle(section.id, p.id)}
                            className="w-3.5 h-3.5 text-[var(--mqm-blush-500)]"
                            disabled={!section.isVisible}
                          />
                          <span className="line-clamp-1">{p.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
