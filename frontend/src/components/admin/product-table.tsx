'use client';

import { FC, useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/utils';
import { Pencil, Trash2, Copy, Eye, EyeOff, Star } from 'lucide-react';
import { useDeleteProduct } from '@/hooks/use-products';
import { useToast } from '@/hooks/use-toast';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDuplicate?: (product: Product) => void;
  onToggleActive?: (product: Product) => void;
  onToggleFeatured?: (product: Product) => void;
  isLoading?: boolean;
}

export const ProductTable: FC<ProductTableProps> = ({
  products,
  onEdit,
  onDuplicate,
  onToggleActive,
  onToggleFeatured,
  isLoading,
}) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { mutate: deleteProduct } = useDeleteProduct();
  const { toast } = useToast();

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Tem certeza que deseja deletar "${name}"?`)) {
      return;
    }

    setDeletingId(id);
    deleteProduct(id, {
      onSuccess: () => {
        toast({
          title: 'Sucesso',
          description: 'Produto deletado com sucesso',
          variant: 'default',
        });
        setDeletingId(null);
      },
      onError: () => {
        toast({
          title: 'Erro',
          description: 'Falha ao deletar produto',
          variant: 'destructive',
        });
        setDeletingId(null);
      },
    });
  };

  if (isLoading) {
    return <div className="p-4 text-muted-foreground text-sm">Carregando...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground text-sm">
        Nenhum produto encontrado
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-muted/35">
            <th className="px-4 py-3 text-left font-semibold text-sm">Nome</th>
            <th className="px-4 py-3 text-left font-semibold text-sm">SKU</th>
            <th className="px-4 py-3 text-right font-semibold text-sm">Preço</th>
            <th className="px-4 py-3 text-center font-semibold text-sm">Estoque</th>
            <th className="px-4 py-3 text-center font-semibold text-sm">Status</th>
            <th className="px-4 py-3 text-right font-semibold text-sm">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-border/75 hover:bg-accent/45 transition-colors">
              <td className="px-4 py-3">
                <div>
                  <p className={cn("font-medium text-sm", !product.active && "text-muted-foreground line-through")}>
                    {product.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{product.slug}</p>
                </div>
              </td>
              <td className="px-4 py-3 text-xs font-mono">{product.sku}</td>
              <td className="px-4 py-3 text-right">
                <p className="font-medium text-sm">{formatCurrency(product.price / 100)}</p>
                {product.originalPrice && (
                  <p className="text-xs text-muted-foreground line-through">
                    {formatCurrency(product.originalPrice / 100)}
                  </p>
                )}
              </td>
              <td className="px-4 py-3 text-center">
                <Badge variant={product.inStock ? 'default' : 'destructive'} className="font-mono text-xs">
                  {product.stockQuantity} un
                </Badge>
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-1.5">
                  {!product.active && <Badge variant="secondary">Oculto</Badge>}
                  {product.isNew && <Badge variant="sage">Novo</Badge>}
                  {product.isFeatured && <Badge variant="rose">Destaque</Badge>}
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-1.5">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onToggleActive?.(product)}
                    title={product.active ? "Ocultar produto" : "Exibir produto"}
                    className="cursor-pointer h-8 w-8 p-0"
                  >
                    {product.active ? <Eye className="size-4 text-muted-foreground" /> : <EyeOff className="size-4 text-destructive" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onToggleFeatured?.(product)}
                    title={product.isFeatured ? "Remover destaque" : "Destacar produto"}
                    className="cursor-pointer h-8 w-8 p-0"
                  >
                    <Star className={cn("size-4", product.isFeatured ? "text-amber-500 fill-amber-500" : "text-muted-foreground")} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDuplicate?.(product)}
                    title="Duplicar produto"
                    className="cursor-pointer h-8 w-8 p-0"
                  >
                    <Copy className="size-3.5 text-muted-foreground" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(product)}
                    disabled={deletingId === product.id}
                    title="Editar produto"
                    className="cursor-pointer h-8 w-8 p-0"
                  >
                    <Pencil className="size-3.5 text-muted-foreground" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(product.id, product.name)}
                    disabled={deletingId === product.id}
                    title="Deletar produto"
                    className="cursor-pointer h-8 w-8 p-0"
                  >
                    {deletingId === product.id ? '...' : <Trash2 className="size-3.5" />}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

