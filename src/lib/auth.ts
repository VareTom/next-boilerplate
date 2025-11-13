import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { PrismaClient } from '@prisma/client'
import { openAPI } from 'better-auth/plugins'
import { env } from '@/lib/env'
import { sendVerificationEmail } from '@/lib/emails'

const prisma = new PrismaClient()

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user }) => {
      // Send reset password email
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      console.log('sendVerificationEmail')
      await sendVerificationEmail(user.email, user.name, url)
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  plugins: [openAPI()],
  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user }) => {
        // Send confirmation email
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async ({ user }) => {
          // Send welcome email
        },
      },
    },
  },
})
