import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const callRouter = router({
  getById: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input, ctx }) =>
      ctx.prisma.call.findUnique({
        where: { ...input },
        include: {
          placementRequest: {
            include: {
              requestee: { include: { district: true } },
              districtPlacementRequest: {
                include: { district: { select: { id: true } } },
              },
              universityPlacementRequests: {
                include: { university: { select: { id: true } } },
              },
            },
          },
          candidate: { include: { user: true } },
        },
      })
    ),
});
