import { protectedProcedure, router } from "../trpc";

export const subjectRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => ctx.prisma.subject.findMany()),
});
