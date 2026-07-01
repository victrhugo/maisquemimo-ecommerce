'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { AdminCustomer, AdminOrder, AdminUser, AdminUserRequest, DashboardPayload } from '@/types/admin';

export const useDashboard = () => {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: async () => {
      const response = await api.get<DashboardPayload>('/admin/dashboard');
      return response.data;
    },
    staleTime: 1000 * 60,
  });
};

export const useAdminOrders = (status: string = 'ALL') => {
  return useQuery({
    queryKey: ['admin', 'orders', status],
    queryFn: async () => {
      const response = await api.get<AdminOrder[]>('/admin/orders', { params: { status } });
      return response.data;
    },
    staleTime: 1000 * 30,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await api.patch<AdminOrder>(`/admin/orders/${id}/status`, { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
    },
  });
};

export const useAdminCustomers = () => {
  return useQuery({
    queryKey: ['admin', 'customers'],
    queryFn: async () => {
      const response = await api.get<AdminCustomer[]>('/admin/customers');
      return response.data;
    },
    staleTime: 1000 * 60,
  });
};

export const useAdminUsers = () => {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: async () => {
      const response = await api.get<AdminUser[]>('/admin/users');
      return response.data;
    },
    staleTime: 1000 * 60,
  });
};

export const useCreateAdminUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: AdminUserRequest) => {
      const response = await api.post<AdminUser>('/admin/users', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};

export const useUpdateAdminUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: AdminUserRequest }) => {
      const response = await api.put<AdminUser>(`/admin/users/${id}`, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};

export const useDeleteAdminUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};

export const useContent = (key: string) => {
  return useQuery({
    queryKey: ['admin', 'content', key],
    queryFn: async () => {
      const response = await api.get<{ key: string; payload: string }>(`/admin/content/${key}`);
      return response.data;
    },
    enabled: !!key,
    staleTime: 1000 * 30,
  });
};

export const usePublicContent = (key: string) => {
  return useQuery({
    queryKey: ['content', key],
    queryFn: async () => {
      const response = await api.get<{ key: string; payload: string }>(`/content/${key}`);
      return response.data;
    },
    enabled: !!key,
    staleTime: 1000 * 30,
  });
};

export const useSaveContent = (key: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: string) => {
      const response = await api.put<{ key: string; payload: string }>(`/admin/content/${key}`, { payload });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'content', key] });
    },
  });
};
