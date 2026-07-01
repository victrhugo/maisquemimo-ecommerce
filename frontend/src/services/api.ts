import axios, { AxiosInstance, AxiosError } from 'axios';

const AUTH_TOKEN_KEY = 'auth_token';

/**
 * Cliente HTTP com interceptadores para JWT
 */
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptador para adicionar token JWT a cada requisição
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Interceptador para tratar erros de resposta
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expirado - redirecionar para login
      localStorage.removeItem(AUTH_TOKEN_KEY);
      document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0; samesite=lax`;
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
