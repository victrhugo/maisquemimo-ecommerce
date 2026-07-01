import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE = 'auth_token';

type JwtPayload = {
  exp?: number;
  role?: string;
};

function decodeBase64Url(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  return atob(padded);
}

function parsePayload(token: string | undefined): JwtPayload | null {
  if (!token) {
    return null;
  }

  try {
    const [, payload] = token.split('.');
    if (!payload) {
      return null;
    }

    return JSON.parse(decodeBase64Url(payload)) as JwtPayload;
  } catch {
    return null;
  }
}

function clearAuthCookie(response: NextResponse): NextResponse {
  response.cookies.set(AUTH_COOKIE, '', { maxAge: 0, path: '/' });
  return response;
}

function isExpired(payload: JwtPayload | null): boolean {
  if (!payload?.exp) {
    return true;
  }
  return payload.exp * 1000 <= Date.now();
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const payload = parsePayload(token);
  const authenticated = Boolean(token) && !isExpired(payload);
  const isAdmin = payload?.role === 'ADMIN';

  const redirectTo = encodeURIComponent(`${pathname}${search}`);

  if (pathname.startsWith('/admin')) {
    if (!authenticated) {
      const target = new URL(`/login?redirect=${redirectTo}`, request.url);
      return clearAuthCookie(NextResponse.redirect(target));
    }

    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (pathname.startsWith('/conta')) {
    if (!authenticated) {
      const target = new URL(`/login?redirect=${redirectTo}`, request.url);
      return clearAuthCookie(NextResponse.redirect(target));
    }
  }

  if (pathname === '/login' || pathname === '/cadastro') {
    if (authenticated) {
      const target = isAdmin ? '/admin' : '/conta';
      return NextResponse.redirect(new URL(target, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/conta/:path*', '/login', '/cadastro'],
};
