'use client';

import { FC, useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { useDeleteProduct } from '@/hooks/use-products';
import { useToast } from '@/hooks/use-toast';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  isLoading?: boolean;
}

export const ProductTable: FC<ProductTableProps> = ({ products, onEdit, isLoading }) => {
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
    return <div className="p-4">Carregando...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Nenhum produto encontrado
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-muted/50">
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
            <tr key={product.id} className="border-b hover:bg-muted/50 transition-colors">
              <td className="px-4 py-3">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.slug}</p>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">{product.sku}</td>
              <td className="px-4 py-3 text-right">
                <p className="font-medium">{formatCurrency(product.price)}</p>
                {product.originalPrice && (
                  <p className="text-sm text-muted-foreground line-through">
                    {formatCurrency(product.originalPrice)}
                  </p>
                )}
              </td>
              <td className="px-4 py-3 text-center">
                <Badge variant={product.inStock ? 'default' : 'destructive'}>
                  {product.stockQuantity}
                </Badge>
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-2">
                  {product.isNew && <Badge variant="sage">Novo</Badge>}
                  {product.isFeatured && <Badge variant="rose">Destaque</Badge>}
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(product)}
                    disabled={deletingId === product.id}
                  >
                    <Pencil2Icon className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(product.id, product.name)}
                    disabled={deletingId === product.id}
                  >
                    {deletingId === product.id ? '...' : <TrashIcon className="w-4 h-4" />}
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
