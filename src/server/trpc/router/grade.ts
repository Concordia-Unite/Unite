import { protectedProcedure, router } from "../trpc";

export const gradeRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => ctx.prisma.grade.findMany()),
});
