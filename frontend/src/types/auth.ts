export interface User {
  id: string;
  name: string;
  email: string;
  role: "CLIENT" | "CUSTOMER" | "ADMIN";
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  tokenType?: string;
  expiresIn?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthSession {
  accessToken: string;
  email: string;
  role: "CLIENT" | "ADMIN";
  exp: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "CLIENT" | "ADMIN";
  active: boolean;
}

export interface UpdateProfileRequest {
  name: string;
  email: string;
}
