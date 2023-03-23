// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwt } from './utils';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    if (req.nextUrl.pathname.startsWith('/api'))
      return new NextResponse(JSON.stringify({ message: 'authentication failed' }),
        { status: 401, headers: { 'content-type': 'application/json' } });

    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/api')) {
    const validRoles = ['admin', 'super-user', 'SEO'];

    if (!validRoles.includes((session.user as any).role)) {
      if (req.nextUrl.pathname.startsWith('/api'))
        return new NextResponse(JSON.stringify({ message: 'authentication failed' }),
          { status: 401, headers: { 'content-type': 'application/json' } });

      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*'],
};