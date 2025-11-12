import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function Home() {
  const t = useTranslations('landing')

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/50 to-background">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">
              Boilerplate
            </span>
          </div>

          <Link href="/dashboard">{t('header.login')}</Link>
        </nav>
      </header>

      <footer className="container mx-auto px-4 py-12 border-t">
        <div className="text-center text-muted-foreground">
          <p>{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  )
}
