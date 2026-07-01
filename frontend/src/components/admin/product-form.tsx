'use client';

import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useForm, useWatch, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useAdminCategories } from '@/hooks/use-categories';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency, slugify, truncate } from '@/lib/utils';
import { uploadImages } from '@/services/image-upload';
import { ArrowDown, ArrowUp, GripVertical, ImagePlus, Link as LinkIcon, Star, Trash2 } from 'lucide-react';

const productFormSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(150),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres').max(500),
  price: z.coerce.number().min(0.01, 'Preço deve ser maior que 0'),
  originalPrice: z.coerce.number().optional().nullable(),
  sku: z.string().min(3, 'SKU deve ter no mínimo 3 caracteres'),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  stockQuantity: z.coerce.number().min(0, 'Quantidade não pode ser negativa'),
  isNew: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  images: z
    .array(
      z.object({
        imageUrl: z
          .string()
          .min(1, 'Imagem é obrigatória')
          .refine((value) => {
            return (
              value.startsWith('data:image/') ||
              value.startsWith('http://') ||
              value.startsWith('https://') ||
              value.startsWith('/')
            );
          }, 'Imagem inválida'),
        displayOrder: z.coerce.number().min(0),
      })
    )
    .min(1, 'Adicione pelo menos uma imagem do produto')
    .default([]),
});

type ProductFormData = z.infer<typeof productFormSchema>;
export type { ProductFormData };

interface ProductFormProps {
  product?: Product;
  isLoading?: boolean;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel?: () => void;
}

export const ProductForm: FC<ProductFormProps> = ({
  product,
  isLoading,
  onSubmit,
  onCancel,
}) => {
  const { toast } = useToast();
  const { data: categories, isLoading: isLoadingCategories } = useAdminCategories();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [manualProductSlug, setManualProductSlug] = useState("");
  const [isProductSlugDirty, setIsProductSlugDirty] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema) as Resolver<ProductFormData>,
    defaultValues: {
      name: product?.name ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
      originalPrice: product?.originalPrice ?? null,
      sku: product?.sku ?? '',
      categoryId: product?.categoryId ?? '',
      stockQuantity: product?.stockQuantity ?? 0,
      isNew: product?.isNew ?? false,
      isFeatured: product?.isFeatured ?? false,
      images:
        product?.images
          ?.slice()
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((img, index) => ({
            imageUrl: img.imageUrl,
            displayOrder: index,
          })) ?? [],
    },
  });

  const values = useWatch({ control });
  const images = values.images ?? [];

  const selectedCategory = useMemo(() => {
    return categories?.find((category) => category.id === values.categoryId);
  }, [categories, values.categoryId]);

  const seoSlug = useMemo(() => slugify(values.name || ''), [values.name]);
  const productSlugPreview = isProductSlugDirty ? manualProductSlug : seoSlug;
  const seoTitle = useMemo(() => {
    const base = (values.name || '').trim();
    return base ? `${base} | Mais que Mimo` : 'Mais que Mimo';
  }, [values.name]);
  const seoDescription = useMemo(() => truncate(values.description || '', 155), [values.description]);

  useEffect(() => {
    if (isProductSlugDirty) {
      return;
    }
    setManualProductSlug(seoSlug);
  }, [seoSlug, isProductSlugDirty]);

  const previewPrice = Number(values.price || 0);
  const previewOriginalPrice = Number(values.originalPrice || 0);

  function normalizeImageOrder(nextImages: ProductFormData['images']) {
    return nextImages.map((image, index) => ({
      imageUrl: image.imageUrl,
      displayOrder: index,
    }));
  }

  function updateImages(nextImages: ProductFormData['images']) {
    setValue('images', normalizeImageOrder(nextImages), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }

  async function handleFiles(filesList: FileList | null) {
    if (!filesList || filesList.length === 0) {
      return;
    }

    const allFiles = Array.from(filesList);
    const imageFiles = allFiles.filter((file) => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
      toast({
        title: 'Arquivo inválido',
        description: 'Selecione apenas arquivos de imagem.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsUploadingImages(true);
      const uploaded = await uploadImages(imageFiles);
      const current = getValues('images') ?? [];
      const next = [
        ...current,
        ...uploaded.map((imageUrl, index) => ({
          imageUrl,
          displayOrder: current.length + index,
        })),
      ];
      updateImages(next);
    } catch {
      toast({
        title: 'Erro ao carregar imagens',
        description: 'Não foi possível processar uma ou mais imagens.',
        variant: 'destructive',
      });
    } finally {
      setIsUploadingImages(false);
    }
  }

  function removeImage(index: number) {
    const current = getValues('images') ?? [];
    updateImages(current.filter((_, imageIndex) => imageIndex !== index));
  }

  function moveImage(index: number, direction: 'up' | 'down') {
    const current = [...(getValues('images') ?? [])];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= current.length) {
      return;
    }

    const temp = current[index];
    current[index] = current[target];
    current[target] = temp;
    updateImages(current);
  }

  function setMainImage(index: number) {
    if (index === 0) {
      return;
    }

    const current = [...(getValues('images') ?? [])];
    const [selected] = current.splice(index, 1);
    current.unshift(selected);
    updateImages(current);
  }

  async function onDropImages(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragOver(false);
    await handleFiles(event.dataTransfer.files);
  }

  const onSubmitForm = async (data: ProductFormData) => {
    try {
      await onSubmit({
        ...data,
        images: normalizeImageOrder(data.images),
      });
      toast({
        title: 'Sucesso',
        description: product ? 'Produto atualizado' : 'Produto criado',
      });
      if (!product) reset();
    } catch {
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar agora. Revise os campos e tente novamente.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Produto *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Caderno Premium Rose"
                  {...register('name')}
                  disabled={isLoading || isSubmitting}
                />
                {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="description">Descrição *</Label>
                <textarea
                  id="description"
                  placeholder="Conte o diferencial do produto em linguagem simples."
                  className="w-full rounded-[var(--radius-lg)] border border-input bg-background/85 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-[var(--motion-fast)] ease-[var(--ease-brand)] focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={5}
                  {...register('description')}
                  disabled={isLoading || isSubmitting}
                />
                {errors.description && <p className="mt-1 text-sm text-destructive">{errors.description.message}</p>}
              </div>

              <div>
                <Label htmlFor="sku">SKU *</Label>
                <Input
                  id="sku"
                  placeholder="Ex: SKU-001"
                  {...register('sku')}
                  disabled={isLoading || isSubmitting}
                />
                {errors.sku && <p className="mt-1 text-sm text-destructive">{errors.sku.message}</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Preços e Estoque</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="price">Preço *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register('price')}
                  disabled={isLoading || isSubmitting}
                />
                {errors.price && <p className="mt-1 text-sm text-destructive">{errors.price.message}</p>}
              </div>

              <div>
                <Label htmlFor="originalPrice">Preço Original</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...register('originalPrice')}
                  disabled={isLoading || isSubmitting}
                />
                {errors.originalPrice && <p className="mt-1 text-sm text-destructive">{errors.originalPrice.message}</p>}
              </div>

              <div>
                <Label htmlFor="stockQuantity">Quantidade *</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  min="0"
                  placeholder="0"
                  {...register('stockQuantity')}
                  disabled={isLoading || isSubmitting}
                />
                {errors.stockQuantity && <p className="mt-1 text-sm text-destructive">{errors.stockQuantity.message}</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Imagens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(event) => void handleFiles(event.target.files)}
                disabled={isLoading || isSubmitting || isUploadingImages}
              />

              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(event) => void onDropImages(event)}
                className={`rounded-[var(--radius-lg)] border-2 border-dashed p-6 text-center transition-colors ${
                  isDragOver ? 'border-primary bg-primary/5' : 'border-border bg-background/60'
                }`}
              >
                <ImagePlus className="mx-auto mb-2 size-6 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Arraste imagens aqui ou selecione arquivos</p>
                <p className="mt-1 text-xs text-muted-foreground">PNG, JPG, WEBP</p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading || isSubmitting || isUploadingImages}
                >
                  {isUploadingImages ? 'Enviando imagens...' : 'Selecionar imagens'}
                </Button>
              </div>

              {errors.images && <p className="text-sm text-destructive">{errors.images.message as string}</p>}

              {images.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhuma imagem adicionada.</p>
              ) : (
                <div className="space-y-2">
                  {images.map((image, index) => (
                    <div
                      key={`${(image.imageUrl ?? '').slice(0, 24)}-${index}`}
                      className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-border/70 bg-background/70 p-2"
                    >
                      <GripVertical className="size-4 text-muted-foreground" />
                      <div className="h-14 w-14 overflow-hidden rounded-md border border-border/70 bg-muted/30">
                        <img src={image.imageUrl ?? ''} alt={`Imagem ${index + 1}`} className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground">Imagem {index + 1}</p>
                        <p className="truncate text-xs text-muted-foreground">{(image.imageUrl ?? '').startsWith('data:') ? 'Upload local' : image.imageUrl}</p>
                        {index === 0 && <p className="mt-0.5 text-[11px] font-semibold text-[var(--mqm-olive-700)]">Imagem principal</p>}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          size="icon-sm"
                          variant="ghost"
                          onClick={() => setMainImage(index)}
                          disabled={index === 0 || isLoading || isSubmitting}
                          title="Definir como imagem principal"
                        >
                          <Star className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          size="icon-sm"
                          variant="ghost"
                          onClick={() => moveImage(index, 'up')}
                          disabled={index === 0 || isLoading || isSubmitting}
                        >
                          <ArrowUp className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          size="icon-sm"
                          variant="ghost"
                          onClick={() => moveImage(index, 'down')}
                          disabled={index === images.length - 1 || isLoading || isSubmitting}
                        >
                          <ArrowDown className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          size="icon-sm"
                          variant="destructive"
                          onClick={() => removeImage(index)}
                          disabled={isLoading || isSubmitting}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Organização</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Categoria *</Label>
                {(categories ?? []).length === 0 && !isLoadingCategories ? (
                  <div className="rounded-[var(--radius-lg)] border border-dashed border-border p-4">
                    <p className="text-sm text-muted-foreground">Nenhuma categoria cadastrada.</p>
                    <Button type="button" variant="outline" className="mt-3" asChild>
                      <a href="/admin/categorias">
                        <LinkIcon className="size-3.5" />
                        Criar categoria
                      </a>
                    </Button>
                  </div>
                ) : (
                  <Select
                    value={values.categoryId || ''}
                    onValueChange={(value) =>
                      setValue('categoryId', value, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
                    }
                    disabled={isLoading || isSubmitting || isLoadingCategories}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={isLoadingCategories ? 'Carregando categorias...' : 'Selecione uma categoria'} />
                    </SelectTrigger>
                    <SelectContent>
                      {(categories ?? []).map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {errors.categoryId && <p className="mt-1 text-sm text-destructive">{errors.categoryId.message}</p>}
              </div>

              <Separator />

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register('isNew')} disabled={isLoading || isSubmitting} className="size-4" />
                  Marcar como novo
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register('isFeatured')} disabled={isLoading || isSubmitting} className="size-4" />
                  Marcar como destaque
                </label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">SEO</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible defaultValue="seo-preview">
                <AccordionItem value="seo-preview" className="border-none">
                  <AccordionTrigger className="py-1">Pré-visualização de SEO</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      <div>
                        <Label htmlFor="seoSlug">Slug sugerido</Label>
                        <Input
                          id="seoSlug"
                          value={productSlugPreview}
                          onChange={(event) => {
                            setManualProductSlug(slugify(event.target.value));
                            setIsProductSlugDirty(true);
                          }}
                          disabled={isLoading || isSubmitting}
                        />
                        <p className="mt-1 text-xs text-muted-foreground">Gerado automaticamente a partir do nome, com edição opcional.</p>
                      </div>
                      <div>
                        <Label htmlFor="seoTitle">Meta title sugerido</Label>
                        <Input id="seoTitle" value={seoTitle} readOnly disabled />
                        <p className="mt-1 text-xs text-muted-foreground">{seoTitle.length}/60 caracteres sugeridos</p>
                      </div>
                      <div>
                        <Label htmlFor="seoDescription">Meta description sugerida</Label>
                        <textarea
                          id="seoDescription"
                          className="w-full rounded-[var(--radius-lg)] border border-input bg-background/85 px-4 py-3 text-sm text-foreground"
                          rows={3}
                          value={seoDescription}
                          readOnly
                          disabled
                        />
                        <p className="mt-1 text-xs text-muted-foreground">{seoDescription.length}/155 caracteres sugeridos</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button type="submit" disabled={isLoading || isSubmitting}>
              {isSubmitting ? 'Salvando...' : product ? 'Atualizar' : 'Criar'}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading || isSubmitting}>
                Cancelar
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-6 xl:sticky xl:top-2 xl:self-start">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Preview do Produto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border/70 bg-muted/20">
                <div className="aspect-square bg-[var(--mqm-warm-100)]">
                  {images[0]?.imageUrl ? (
                    <img src={images[0].imageUrl} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Sem imagem</div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {selectedCategory?.name || 'Categoria'}
                </p>
                <p className="line-clamp-2 text-base font-semibold text-foreground">{values.name || 'Nome do produto'}</p>
                <div className="flex items-end gap-2">
                  <p className="text-lg font-bold text-[var(--mqm-olive-800)]">{formatCurrency(previewPrice || 0)}</p>
                  {previewOriginalPrice > previewPrice && (
                    <p className="text-xs text-muted-foreground line-through">{formatCurrency(previewOriginalPrice)}</p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">SKU: {values.sku || '---'}</p>
                <p className="text-xs text-muted-foreground">Estoque: {values.stockQuantity ?? 0}</p>
              </div>

              <Separator />

              <p className="line-clamp-4 text-sm text-muted-foreground">{values.description || 'A descrição aparecerá aqui durante a edição.'}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
};
