"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Pencil, Trash2, ImageIcon, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

interface MockBanner {
  id: string;
  title: string;
  text: string;
  desktopImage: string;
  mobileImage: string;
  buttonText: string;
  link: string;
  order: number;
  isActive: boolean;
}

const initialBanners: MockBanner[] = [
  {
    id: "1",
    title: "Papelaria Afetiva",
    text: "Feito à mão para trazer afeto e organização.",
    desktopImage: "/images/placeholder-hero.svg",
    mobileImage: "/images/placeholder-hero.svg",
    buttonText: "Ver Cadernos",
    link: "/produtos?categoria=cadernos",
    order: 1,
    isActive: true,
  },
  {
    id: "2",
    title: "Coleção Calmaria",
    text: "Organize seus dias com leveza e suavidade.",
    desktopImage: "/images/hero-detail.svg",
    mobileImage: "/images/hero-detail.svg",
    buttonText: "Ver Planners",
    link: "/produtos?categoria=planner",
    order: 2,
    isActive: true,
  },
];

export default function AdminBannersPage() {
  const { toast } = useToast();
  const [banners, setBanners] = useState<MockBanner[]>(initialBanners);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<MockBanner | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [desktopImage, setDesktopImage] = useState("");
  const [mobileImage, setMobileImage] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [link, setLink] = useState("");
  const [order, setOrder] = useState(1);
  const [isActive, setIsActive] = useState(true);

  function openCreateDialog() {
    setEditingBanner(null);
    setTitle("");
    setText("");
    setDesktopImage("/images/placeholder-hero.svg");
    setMobileImage("/images/placeholder-hero.svg");
    setButtonText("Explorar");
    setLink("/produtos");
    setOrder(banners.length + 1);
    setIsActive(true);
    setIsDialogOpen(true);
  }

  function openEditDialog(banner: MockBanner) {
    setEditingBanner(banner);
    setTitle(banner.title);
    setText(banner.text);
    setDesktopImage(banner.desktopImage);
    setMobileImage(banner.mobileImage);
    setButtonText(banner.buttonText);
    setLink(banner.link);
    setOrder(banner.order);
    setIsActive(banner.isActive);
    setIsDialogOpen(true);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !desktopImage.trim()) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (editingBanner) {
      // Edit
      setBanners(
        banners.map((b) =>
          b.id === editingBanner.id
            ? { ...b, title, text, desktopImage, mobileImage, buttonText, link, order, isActive }
            : b
        )
      );
      toast({ title: "Sucesso", description: "Banner atualizado com sucesso!" });
    } else {
      // Create
      const newBanner: MockBanner = {
        id: (banners.length + 1).toString(),
        title,
        text,
        desktopImage,
        mobileImage,
        buttonText,
        link,
        order,
        isActive,
      };
      setBanners([...banners, newBanner]);
      toast({ title: "Sucesso", description: "Banner criado com sucesso!" });
    }

    setIsDialogOpen(false);
  }

  function handleDelete(id: string) {
    if (confirm("Tem certeza que deseja excluir este banner?")) {
      setBanners(banners.filter((b) => b.id !== id));
      toast({ title: "Sucesso", description: "Banner excluído com sucesso!" });
    }
  }

  function toggleStatus(id: string) {
    setBanners(
      banners.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b))
    );
    const updated = banners.find((b) => b.id === id);
    toast({
      title: "Banner atualizado",
      description: `Banner "${updated?.title}" alterado para ${!updated?.isActive ? "Ativo" : "Inativo"}.`,
    });
  }

  return (
    <div className="space-y-6 select-none font-sans pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-foreground">Banners Promocionais</h1>
          <p className="text-muted-foreground text-sm">Gerencie os banners e slides que aparecem no topo da loja</p>
        </div>
        <Button onClick={openCreateDialog} className="cursor-pointer">
          <Plus className="size-4 mr-2" />
          Novo Banner
        </Button>
      </div>

      {/* Banners Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {banners.sort((a, b) => a.order - b.order).map((banner) => (
          <Card key={banner.id} className={!banner.isActive ? "opacity-60 bg-muted/20" : ""}>
            <div className="relative aspect-[16/8] w-full overflow-hidden rounded-t-[var(--radius-xl)] bg-[var(--mqm-warm-100)] border-b">
              <Image
                src={banner.desktopImage}
                alt={banner.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-1.5">
                <Badge variant={banner.isActive ? "default" : "secondary"}>
                  Ordem {banner.order}
                </Badge>
                {!banner.isActive && (
                  <Badge variant="destructive">Inativo</Badge>
                )}
              </div>
            </div>
            <CardContent className="p-5 space-y-4">
              <div>
                <h3 className="text-base font-bold text-[var(--mqm-olive-800)] uppercase tracking-wider">{banner.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{banner.text}</p>
                <div className="mt-2 text-xs flex flex-wrap gap-2 text-muted-foreground">
                  <span>Botão: <strong className="text-foreground">{banner.buttonText}</strong></span>
                  <span>•</span>
                  <span>Link: <strong className="text-foreground">{banner.link}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center border-t pt-4">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleStatus(banner.id)}
                  title={banner.isActive ? "Ocultar banner" : "Exibir banner"}
                  className="cursor-pointer h-8 px-3"
                >
                  {banner.isActive ? (
                    <>
                      <EyeOff className="size-3.5 mr-1.5" />
                      Inativar
                    </>
                  ) : (
                    <>
                      <Eye className="size-3.5 mr-1.5" />
                      Ativar
                    </>
                  )}
                </Button>
                <div className="flex gap-1.5">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(banner)}
                    className="cursor-pointer h-8 w-8 p-0"
                  >
                    <Pencil className="size-3.5 text-muted-foreground" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(banner.id)}
                    className="cursor-pointer h-8 w-8 p-0"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {banners.length === 0 && (
          <div className="sm:col-span-2 p-12 text-center text-muted-foreground text-sm border rounded-xl bg-card">
            Nenhum banner cadastrado.
          </div>
        )}
      </div>

      {/* Dialog for Banner Editor */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md select-none font-sans">
          <DialogHeader>
            <DialogTitle>
              {editingBanner ? "Editar Banner" : "Criar Novo Banner"}
            </DialogTitle>
            <DialogDescription>
              Insira as informações do banner promocional.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="bannerTitle">Título *</Label>
              <Input
                id="bannerTitle"
                placeholder="Ex: Coleção Jardim"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="bannerText">Subtítulo / Texto de Apoio</Label>
              <Input
                id="bannerText"
                placeholder="Ex: Aquarelas florais em edição limitada."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="desktopImg">Imagem Desktop (URL) *</Label>
              <Input
                id="desktopImg"
                value={desktopImage}
                onChange={(e) => setDesktopImage(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="mobileImg">Imagem Mobile (URL)</Label>
              <Input
                id="mobileImg"
                value={mobileImage}
                onChange={(e) => setMobileImage(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="btnTxt">Texto do Botão</Label>
                <Input
                  id="btnTxt"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="btnLnk">Link de Destino</Label>
                <Input
                  id="btnLnk"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="bannerOrder">Ordem de Exibição</Label>
              <Input
                id="bannerOrder"
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
              />
            </div>

            <div className="flex items-center gap-2 pt-2 cursor-pointer select-none">
              <input
                id="bannerActive"
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 focus:ring-[var(--mqm-blush-400)]"
              />
              <Label htmlFor="bannerActive" className="cursor-pointer text-sm">Exibir banner na loja</Label>
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
