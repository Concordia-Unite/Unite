import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { Position } from "@prisma/client";

export const universityRouter = router({
  getAll: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.university.findMany({
      select: {
        id: true,
        name: true,
        positions: true,
      },
    })
  ),

  filterByPosition: protectedProcedure
    .input(
      z.object({
        position: z.nativeEnum(Position),
      })
    )
    .query(({ input, ctx }) =>
      ctx.prisma.university.findMany({
        where: {
          positions: {
            has: input.position,
          },
        },
      })
    ),
});
