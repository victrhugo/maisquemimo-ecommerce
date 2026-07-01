'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UpdateProfileRequest } from '@/types/auth';
import {
  AUTH_CHANGED_EVENT,
  clearAuthToken,
  getAuthSession,
  getProfile,
  updateProfile,
} from '@/services/auth';

export function useAuthSession() {
  const [session, setSession] = useState(() => getAuthSession());

  useEffect(() => {
    const syncSession = () => setSession(getAuthSession());

    syncSession();
    window.addEventListener('storage', syncSession);
    window.addEventListener(AUTH_CHANGED_EVENT, syncSession);

    return () => {
      window.removeEventListener('storage', syncSession);
      window.removeEventListener(AUTH_CHANGED_EVENT, syncSession);
    };
  }, []);

  const isAuthenticated = Boolean(session?.accessToken);
  const isAdmin = session?.role === 'ADMIN';

  return {
    session,
    isAuthenticated,
    isAdmin,
    logout: clearAuthToken,
  };
}

export function useAuthProfile() {
  const { isAuthenticated } = useAuthSession();

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getProfile,
    enabled: isAuthenticated,
    staleTime: 1000 * 30,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfileRequest) => updateProfile(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(['auth', 'me'], data);
    },
  });
}
