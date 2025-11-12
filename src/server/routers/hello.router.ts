import { HelloService } from '@/services/hello.service'
import { publicProcedure, router } from '@/server/trpc'

export const helloRouter = router({
  hello: publicProcedure.query(async ({ input }) => {
    return HelloService.hello()
  }),
})
