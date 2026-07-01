'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { Product } from '@/types/product';

interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  categoryId: string;
  stockQuantity: number;
  sku: string;
  isNew: boolean;
  isFeatured: boolean;
  active?: boolean;
  images: Array<{ imageUrl: string; displayOrder: number }>;
}

/**
 * Hook para listar todos os produtos
 */
export const useProducts = (page: number = 0, pageSize: number = 20) => {
  return useQuery({
    queryKey: ['products', page, pageSize],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Product>>('/products', {
        params: { page, size: pageSize },
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

/**
 * Hook para buscar produto por ID
 */
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook para buscar produto por slug
 */
export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['products', 'slug', slug],
    queryFn: async () => {
      const response = await api.get<Product>(`/products/slug/${slug}`);
      return response.data;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook para buscar produtos destacados
 */
export const useFeaturedProducts = (pageSize: number = 10) => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Product>>('/products/featured', {
        params: { size: pageSize },
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 10,
  });
};

/**
 * Hook para buscar produtos novos
 */
export const useNewProducts = (pageSize: number = 10) => {
  return useQuery({
    queryKey: ['products', 'new'],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Product>>('/products/new', {
        params: { size: pageSize },
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 10,
  });
};

/**
 * Hook para buscar produtos por categoria
 */
export const useProductsByCategory = (categoryId: string, page: number = 0, pageSize: number = 20) => {
  return useQuery({
    queryKey: ['products', 'category', categoryId, page],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Product>>(`/products/category/${categoryId}`, {
        params: { page, size: pageSize },
      });
      return response.data;
    },
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook para buscar produtos
 */
export const useSearchProducts = (searchTerm: string, page: number = 0, pageSize: number = 20) => {
  return useQuery({
    queryKey: ['products', 'search', searchTerm, page],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Product>>('/products/search', {
        params: { q: searchTerm, page, size: pageSize },
      });
      return response.data;
    },
    enabled: !!searchTerm && searchTerm.length > 2,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook para criar novo produto (admin)
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProductRequest) => {
      const response = await api.post<Product>('/products', data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidar lista de produtos
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

/**
 * Hook para atualizar produto (admin)
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ProductRequest }) => {
      const response = await api.put<Product>(`/products/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidar produto específico e lista
      queryClient.invalidateQueries({ queryKey: ['products', data.id] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

/**
 * Hook para deletar produto (admin)
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/products/${id}`);
    },
    onSuccess: () => {
      // Invalidar lista de produtos
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
