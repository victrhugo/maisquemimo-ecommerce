'use client';

import { FC, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { TrashIcon, PlusIcon } from '@radix-ui/react-icons';

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
  images: z.array(
    z.object({
      imageUrl: z.string().url('URL de imagem inválida'),
      displayOrder: z.coerce.number().min(0),
    })
  ).default([]),
});

type ProductFormData = z.infer<typeof productFormSchema>;

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
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema) as any,
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice,
          sku: product.sku,
          categoryId: product.categoryId,
          stockQuantity: product.stockQuantity,
          isNew: product.isNew,
          isFeatured: product.isFeatured,
          images: product.images.map((img) => ({
            imageUrl: img.imageUrl,
            displayOrder: img.displayOrder,
          })),
        }
      : undefined,
  });

  const { fields: imageFields, append, remove } = useFieldArray({
    control,
    name: 'images',
  });

  const onSubmitForm = async (data: ProductFormData) => {
    try {
      await onSubmit(data);
      toast({
        title: 'Sucesso',
        description: product ? 'Produto atualizado' : 'Produto criado',
      });
      if (!product) reset();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao salvar produto',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
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
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Descrição *</Label>
            <textarea
              id="description"
              placeholder="Descrição detalhada do produto..."
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              rows={4}
              {...register('description')}
              disabled={isLoading || isSubmitting}
            />
            {errors.description && (
              <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sku">SKU *</Label>
              <Input
                id="sku"
                placeholder="Ex: SKU-001"
                {...register('sku')}
                disabled={isLoading || isSubmitting}
              />
              {errors.sku && <p className="text-sm text-destructive mt-1">{errors.sku.message}</p>}
            </div>

            <div>
              <Label htmlFor="categoryId">Categoria *</Label>
              <Input
                id="categoryId"
                placeholder="ID da categoria"
                {...register('categoryId')}
                disabled={isLoading || isSubmitting}
              />
              {errors.categoryId && (
                <p className="text-sm text-destructive mt-1">{errors.categoryId.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preços e Estoque */}
      <Card>
        <CardHeader>
          <CardTitle>Preços e Estoque</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">Preço *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register('price')}
                disabled={isLoading || isSubmitting}
              />
              {errors.price && <p className="text-sm text-destructive mt-1">{errors.price.message}</p>}
            </div>

            <div>
              <Label htmlFor="originalPrice">Preço Original</Label>
              <Input
                id="originalPrice"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register('originalPrice')}
                disabled={isLoading || isSubmitting}
              />
              {errors.originalPrice && (
                <p className="text-sm text-destructive mt-1">{errors.originalPrice.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="stockQuantity">Quantidade *</Label>
              <Input
                id="stockQuantity"
                type="number"
                placeholder="0"
                {...register('stockQuantity')}
                disabled={isLoading || isSubmitting}
              />
              {errors.stockQuantity && (
                <p className="text-sm text-destructive mt-1">{errors.stockQuantity.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register('isNew')}
              disabled={isLoading || isSubmitting}
              className="w-4 h-4"
            />
            <span className="text-sm">Marcar como novo</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register('isFeatured')}
              disabled={isLoading || isSubmitting}
              className="w-4 h-4"
            />
            <span className="text-sm">Marcar como destaque</span>
          </label>
        </CardContent>
      </Card>

      {/* Imagens */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Imagens</CardTitle>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => append({ imageUrl: '', displayOrder: imageFields.length })}
            disabled={isLoading || isSubmitting}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Adicionar Imagem
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {imageFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label htmlFor={`images.${index}.imageUrl`} className="text-xs">
                  URL da Imagem
                </Label>
                <Input
                  id={`images.${index}.imageUrl`}
                  placeholder="https://exemplo.com/imagem.jpg"
                  {...register(`images.${index}.imageUrl`)}
                  disabled={isLoading || isSubmitting}
                />
              </div>
              <div className="w-20">
                <Label htmlFor={`images.${index}.displayOrder`} className="text-xs">
                  Ordem
                </Label>
                <Input
                  id={`images.${index}.displayOrder`}
                  type="number"
                  {...register(`images.${index}.displayOrder`)}
                  disabled={isLoading || isSubmitting}
                />
              </div>
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={() => remove(index)}
                disabled={isLoading || isSubmitting}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {imageFields.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhuma imagem adicionada</p>
          )}
        </CardContent>
      </Card>

      {/* Botões */}
      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="bg-rose-500 hover:bg-rose-600"
        >
          {isSubmitting ? 'Salvando...' : product ? 'Atualizar' : 'Criar'}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading || isSubmitting}
          >
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
};
