import { router } from '../trpc'
import { helloRouter } from '@/server/routers/hello.router'

export const appRouter = router({
  hello: helloRouter,
})

export type AppRouter = typeof appRouter
