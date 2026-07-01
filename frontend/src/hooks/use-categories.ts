'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { Category, CategoryRequest } from '@/types/category';

export const usePublicCategories = () => {
  return useQuery({
    queryKey: ['categories', 'public'],
    queryFn: async () => {
      const response = await api.get<Category[]>('/categories');
      return response.data;
    },
    staleTime: 1000 * 60 * 10,
  });
};

export const useAdminCategories = () => {
  return useQuery({
    queryKey: ['categories', 'admin'],
    queryFn: async () => {
      const response = await api.get<Category[]>('/admin/categories');
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CategoryRequest) => {
      const response = await api.post<Category>('/admin/categories', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: CategoryRequest }) => {
      const response = await api.put<Category>(`/admin/categories/${id}`, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
