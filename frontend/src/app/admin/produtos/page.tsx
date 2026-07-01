'use client';

import { useState } from 'react';
import { useProducts, useCreateProduct, useUpdateProduct, type ProductRequest } from '@/hooks/use-products';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { ProductTable } from '@/components/admin/product-table';
import { ProductForm, type ProductFormData } from '@/components/admin/product-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { PlusIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

export default function AdminProductsPage() {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data, isLoading } = useProducts(page, 20);
  const { mutateAsync: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutateAsync: updateProduct, isPending: isUpdating } = useUpdateProduct();

  const toProductRequest = (formData: ProductFormData): ProductRequest => ({
    ...formData,
    originalPrice: formData.originalPrice ?? null,
  });

  const handleCreate = async (formData: ProductFormData) => {
    await createProduct(toProductRequest(formData));
    setIsDialogOpen(false);
  };

  const handleUpdate = async (formData: ProductFormData) => {
    if (editingProduct && editingProduct.id) {
      await updateProduct({ id: editingProduct.id, data: toProductRequest(formData) });
      setIsDialogOpen(false);
      setEditingProduct(null);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDuplicate = (product: Product) => {
    const duplicateProduct: Product = {
      ...product,
      id: "", // Clear ID so it is created as a new item
      name: `${product.name} (Cópia)`,
      sku: `${product.sku}-COPIA`,
    };
    setEditingProduct(duplicateProduct);
    setIsDialogOpen(true);
  };

  const handleToggleActive = async (product: Product) => {
    await updateProduct({
      id: product.id,
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        sku: product.sku,
        categoryId: product.categoryId,
        stockQuantity: product.stockQuantity,
        isNew: product.isNew,
        isFeatured: product.isFeatured,
        active: !product.active,
        images: product.images.map((img) => ({
          imageUrl: img.imageUrl,
          displayOrder: img.displayOrder,
        })),
      },
    });
  };

  const handleToggleFeatured = async (product: Product) => {
    await updateProduct({
      id: product.id,
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        sku: product.sku,
        categoryId: product.categoryId,
        stockQuantity: product.stockQuantity,
        isNew: product.isNew,
        isFeatured: !product.isFeatured,
        active: product.active,
        images: product.images.map((img) => ({
          imageUrl: img.imageUrl,
          displayOrder: img.displayOrder,
        })),
      },
    });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-foreground">Produtos</h1>
          <p className="text-muted-foreground text-sm">Gerencie o catálogo de produtos</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="cursor-pointer">
          <PlusIcon className="w-4 h-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="rounded-[var(--radius-xl)] border border-border/80 bg-card shadow-[var(--shadow-sm)]">
        <ProductTable
          products={data?.content || []}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onToggleActive={handleToggleActive}
          onToggleFeatured={handleToggleFeatured}
          isLoading={isLoading}
        />
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Página {data.currentPage + 1} de {data.totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              disabled={page >= data.totalPages - 1}
              onClick={() => setPage(page + 1)}
            >
              Próxima
            </Button>
          </div>
        </div>
      )}

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct && editingProduct.id ? 'Editar Produto' : editingProduct ? 'Duplicar Produto' : 'Criar Novo Produto'}
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            product={editingProduct || undefined}
            isLoading={isCreating || isUpdating}
            onSubmit={editingProduct && editingProduct.id ? handleUpdate : handleCreate}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
