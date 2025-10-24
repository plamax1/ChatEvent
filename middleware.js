import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token')?.value; // token dal cookie (HTTP-only)

  const protectedRoutes = ['/users', '/events', '/profile', '/qr']; // rotte da proteggere
  const isProtected = protectedRoutes.some(path => req.nextUrl.pathname.startsWith(path));

  if (isProtected && !token) {
    // nessun token → redirect al login
    const loginUrl = new URL('/auth/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // se token presente → lascia passare
  return NextResponse.next();
}
