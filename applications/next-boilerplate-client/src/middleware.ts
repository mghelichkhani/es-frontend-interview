import { NextRequest, NextResponse } from 'next/server'
import { locales, LOCALE_COOKIE_NAME, defaultLocale } from './i18n/config'
import { detectLocaleFromHeader } from './i18n/utils'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_vercel') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // If pathname already has a locale prefix, redirect to clean URL
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    const locale = locales.find(
      (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
    )
    if (locale) {
      const newPathname = pathname.replace(`/${locale}`, '') || '/'
      const url = new URL(newPathname, request.url)
      // Preserve query parameters
      url.search = request.nextUrl.search
      return NextResponse.redirect(url)
    }
  }

  const response = NextResponse.next()

  // Set locale cookie for first-time visitors based on Accept-Language header
  // This improves UX by detecting their preferred language automatically
  const existingCookie = request.cookies.get(LOCALE_COOKIE_NAME)?.value
  if (!existingCookie) {
    const acceptLanguage = request.headers.get('accept-language')
    const detectedLocale = detectLocaleFromHeader(acceptLanguage)
    
    if (detectedLocale && detectedLocale !== defaultLocale) {
      // Set cookie for future requests
      response.cookies.set(LOCALE_COOKIE_NAME, detectedLocale, {
        path: '/',
        maxAge: 31536000, // 1 year
        sameSite: 'lax',
      })
    }
  }

  return response
}

export const config = {
  // Match all pathnames except for static files and API routes
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}


