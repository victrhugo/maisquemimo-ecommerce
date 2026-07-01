'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import type { Order } from '@/types/order';

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await api.get<Order[]>('/orders');
      return response.data;
    },
    staleTime: 1000 * 30,
  });
};
