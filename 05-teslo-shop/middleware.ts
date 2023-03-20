// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwt } from './utils';

// This function can be marked `async` if using `await` inside
export async function  middleware(req: NextRequest) {
  let token = req.cookies.get('token')?.value || '';

  console.log({ pathname: req.nextUrl.pathname });
  let isValidToken = false;

  try {
    // ! No se puede implementar la validacion del token como middleware
    // jwt.isValidToken(token);
    isValidToken = true;
  } catch (error) {
    isValidToken = false;
  }

  if (!isValidToken) {
    return NextResponse.redirect(`/auth/login?p=${req.nextUrl.pathname}`);
  }
  NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/checkout/:path*'],
};