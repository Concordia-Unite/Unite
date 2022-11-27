import { protectedProcedure, router } from "../trpc";

export const districtRouter = router({
  getAll: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.district.findMany({
      select: {
        id: true,
        name: true,
      },
    })
  ),
});
