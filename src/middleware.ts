import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher:
    '/((?!api|trpc|_next|_vercel|robot|sitemap.*\\..*|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|bmp|tiff|avif|mp4|webm|ogg|mov|avi|mkv|flv|wmv|mpg|mpeg|3gp|m4v)).*)',
}
