import api from '@/services/api';
import type {
  AuthSession,
  AuthTokens,
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest,
  UserProfile,
} from '@/types/auth';

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_CHANGED_EVENT = 'auth-changed';

function decodeBase64Url(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  return atob(padded);
}

function decodeToken(token: string): AuthSession | null {
  try {
    const [, payload] = token.split('.');
    if (!payload) {
      return null;
    }

    const parsed = JSON.parse(decodeBase64Url(payload));
    if (!parsed?.sub || !parsed?.exp) {
      return null;
    }

    return {
      accessToken: token,
      email: String(parsed.sub),
      role: parsed.role === 'ADMIN' ? 'ADMIN' : 'CLIENT',
      exp: Number(parsed.exp),
    };
  } catch {
    return null;
  }
}

function notifyAuthChanged() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
  }
}

export function setAuthToken(token: string, expiresInSeconds?: number): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(AUTH_TOKEN_KEY, token);

  const maxAge = typeof expiresInSeconds === 'number' && expiresInSeconds > 0
    ? Math.floor(expiresInSeconds)
    : 60 * 60 * 24;

  document.cookie = `${AUTH_TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; samesite=lax`;
  notifyAuthChanged();
}

export function clearAuthToken(): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(AUTH_TOKEN_KEY);
  document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0; samesite=lax`;
  notifyAuthChanged();
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getAuthSession(): AuthSession | null {
  const token = getAuthToken();
  if (!token) {
    return null;
  }

  const session = decodeToken(token);
  if (!session) {
    clearAuthToken();
    return null;
  }

  if (session.exp * 1000 <= Date.now()) {
    clearAuthToken();
    return null;
  }

  return session;
}

export async function login(payload: LoginRequest): Promise<AuthSession> {
  const response = await api.post<AuthTokens>('/auth/login', payload);
  const token = response.data.accessToken;

  if (!token) {
    throw new Error('Token não retornado pelo servidor');
  }

  setAuthToken(token, response.data.expiresIn);
  const session = getAuthSession();
  if (!session) {
    throw new Error('Sessão inválida após login');
  }

  return session;
}

export async function register(payload: RegisterRequest): Promise<AuthSession> {
  const response = await api.post<AuthTokens>('/auth/register', payload);
  const token = response.data.accessToken;

  if (!token) {
    throw new Error('Token não retornado pelo servidor');
  }

  setAuthToken(token, response.data.expiresIn);
  const session = getAuthSession();
  if (!session) {
    throw new Error('Sessão inválida após cadastro');
  }

  return session;
}

export async function getProfile(): Promise<UserProfile> {
  const response = await api.get<UserProfile>('/auth/me');
  return response.data;
}

export async function updateProfile(payload: UpdateProfileRequest): Promise<UserProfile> {
  const response = await api.put<UserProfile>('/auth/me', payload);
  return response.data;
}

export { AUTH_CHANGED_EVENT, AUTH_TOKEN_KEY };
