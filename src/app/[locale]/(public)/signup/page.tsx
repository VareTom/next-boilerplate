import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { SignupForm } from '@/components/auth/signup-form'

export default function SignupPage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {t('auth.signUp.title')}
          </h2>
        </div>
      </div>

      <div className="sm:mx-auto mx-4 sm:w-full max-w-2xl">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
          <SignupForm />
        </div>

        <div className="mt-6 flex justify-center">
          <p className="text-sm text-gray-600">
            {t('auth.signUp.hasAccount')}{' '}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              {t('auth.signUp.signIn')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
