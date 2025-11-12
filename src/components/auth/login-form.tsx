'use client'

import { useTranslations } from 'next-intl'
import { authClient } from '@/lib/auth-client'
import { Link, useRouter } from '@/i18n/navigation'
import { Loader2, Lock, LogIn, Mail } from 'lucide-react'
import { GoogleButton } from '@/components/buttons/google.button'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useMemo, useState } from 'react'

export function LoginForm() {
  const router = useRouter()
  const t = useTranslations('auth.signIn')
  const tValidation = useTranslations('formValidation')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loginSchema = useMemo(
    () =>
      z.object({
        email: z.string().email(tValidation('emailInvalid')),
        password: z.string().min(1, tValidation('passwordRequired')),
      }),
    [tValidation],
  )

  type LoginFormData = z.infer<typeof loginSchema>

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const handleEmailLogin = async (data: LoginFormData) => {
    setLoading(true)
    setError('')

    try {
      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      })

      setLoading(false)
      if (result.error) {
        setError(result.error.message ?? t('error'))
      } else {
        router.replace('/dashboard')
      }
    } catch {
      setError(t('error'))
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')

    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
      })
    } catch {
      setError(t('errorGoogle'))
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-center text-sm text-red-800">{error}</p>
        </div>
      )}

      <GoogleButton loading={loading} onClick={handleGoogleLogin} />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">
            {t('orWithEmail')}
          </span>
        </div>
      </div>

      <form
        id="login-form"
        onSubmit={form.handleSubmit(handleEmailLogin)}
        className="space-y-4"
      >
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t('email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...field}
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    fieldState.invalid
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                />
              </div>
              {fieldState.invalid && (
                <p className="mt-1 text-sm text-red-600">
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t('password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...field}
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    fieldState.invalid
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-blue-500'
                  }`}
                />
              </div>
              {fieldState.invalid && (
                <p className="mt-1 text-sm text-red-600">
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          )}
        />

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            {t('forgotPassword')}
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {t('signingIn')}
            </>
          ) : (
            <>
              <LogIn className="h-5 w-5" />
              {t('submit')}
            </>
          )}
        </button>
      </form>
    </div>
  )
}
