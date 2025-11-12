import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          {t('auth.signIn.title')}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto mx-4 sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
          <LoginForm />
        </div>

        <div className="mt-6 flex justify-center">
          <p className="text-sm text-gray-600">
            {t('auth.signIn.noAccount')}{' '}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              {t('auth.signIn.signUpFree')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
