import { initTRPC, TRPCError } from '@trpc/server'
import { auth } from '@/lib/auth'
import { User } from '@prisma/client'
import superjson from 'superjson'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export interface Context {
  user?: {
    id: string
    email: string
    name: string
  }
}

export async function createContext(req?: NextRequest): Promise<Context> {
  let user: User | null = null
  if (req) {
    try {
      const session = await auth.api.getSession({
        headers: req.headers,
      })

      if (session?.user) {
        user = await prisma.user.findUnique({
          where: {
            id: session.user.id,
          },
        })
      }
    } catch (error) {
      // Session invalid or not found
      console.error('Error getting session:', error)
    }
  }

  return {
    user: user ?? undefined,
  }
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    })
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  })
})
