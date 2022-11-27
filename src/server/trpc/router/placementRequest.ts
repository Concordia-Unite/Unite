import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { PlacementRequestStatus } from "@prisma/client";

export const placementRequestRouter = router({
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        status: z.nativeEnum(PlacementRequestStatus),
      })
    )
    .mutation(({ input, ctx }) =>
      ctx.prisma.placementRequest.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
        },
      })
    ),

  deletePlacementRequest: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(({ input, ctx }) =>
      ctx.prisma.placementRequest.delete({
        where: {
          id: input.id,
        },
      })
    ),
});
