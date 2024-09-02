import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*'],
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log('middleware', session);

  if (session?.role === 'GUEST') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (session?.role === 'USER' && pathname.includes('/admin')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}
