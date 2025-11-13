import { Resend } from 'resend'
import { WelcomeEmail } from '@/emails/welcome'
import { VerifyEmail } from '@/emails/verify-email'
import { env } from '@/lib/env'

const resend = new Resend(env.RESEND_API_KEY)

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Welcome to Your App!',
      react: WelcomeEmail({ name }),
    })

    if (error) {
      console.error('Failed to send welcome email:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return { success: false, error }
  }
}

export async function sendVerificationEmail(
  email: string,
  name: string,
  verificationUrl: string,
) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Verify your email address',
      react: VerifyEmail({ name, verificationUrl }),
    })

    if (error) {
      console.error('Failed to send verification email:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending verification email:', error)
    return { success: false, error }
  }
}
