import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const placementRequestRouter = router({
  getById: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(({ input, ctx }) =>
      ctx.prisma.placementRequest.findUnique({
        where: { id: input.id },
        include: {
          requestee: {
            select: { name: true, variant: true },
          },
          districtPlacementRequest: {
            include: {
              district: {
                select: {
                  id: true,
                },
              },
            },
          },
          universityPlacementRequests: {
            include: {
              university: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      })
    ),
});
