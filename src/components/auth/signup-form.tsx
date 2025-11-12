'use client'

import { useTranslations } from 'next-intl'
import { authClient } from '@/lib/auth-client'
import { useRouter } from '@/i18n/navigation'
import { Loader2, Lock, Mail, User, UserPlus } from 'lucide-react'
import { GoogleButton } from '@/components/buttons/google.button'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useMemo, useState } from 'react'

export function SignupForm() {
  const router = useRouter()
  const t = useTranslations('auth.signUp')
  const tErrors = useTranslations('auth.errors')
  const tValidation = useTranslations('formValidation')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const signupSchema = useMemo(
    () =>
      z
        .object({
          name: z
            .string()
            .min(1, tValidation('nameRequired'))
            .min(2, tValidation('nameMinLength')),
          email: z.string().email(tValidation('emailInvalid')),
          password: z
            .string()
            .min(1, tValidation('passwordRequired'))
            .min(8, tValidation('passwordMinLength')),
          confirmPassword: z
            .string()
            .min(1, tValidation('confirmPasswordRequired')),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: tValidation('passwordMismatch'),
          path: ['confirmPassword'],
        }),
    [tValidation],
  )

  type SignupFormData = z.infer<typeof signupSchema>

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const handleEmailSignup = async (data: SignupFormData) => {
    setLoading(true)
    setError('')

    try {
      await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      })

      setLoading(false)
      router.replace('/dashboard')
    } catch {
      setError(tErrors('genericError'))
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
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

      <GoogleButton loading={loading} onClick={handleGoogleSignup} />

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
        id="signup-form"
        onSubmit={form.handleSubmit(handleEmailSignup)}
        className="space-y-4"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <div>
                <label
                  htmlFor="signup-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t('name')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...field}
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
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
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <div>
                <label
                  htmlFor="signup-email"
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
                    id="signup-email"
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
        </div>

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <label
                htmlFor="signup-password"
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
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
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
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <label
                htmlFor="signup-confirm-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t('confirmPassword')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...field}
                  id="signup-confirm-password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
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

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {t('creating')}
            </>
          ) : (
            <>
              <UserPlus className="h-5 w-5" />
              {t('submit')}
            </>
          )}
        </button>
      </form>
    </div>
  )
}
