import { Variant } from "@enums/variant";
import { CallingEntityRepo } from "@server/repositories/calling-entity";
import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const callingEntityRouter = router({
  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    return await new CallingEntityRepo(ctx.prisma).getFromUserId(
      ctx.session.user.id
    );
  }),

  createOne: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        districtId: z.number(),
        variant: z.nativeEnum(Variant),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await new CallingEntityRepo(ctx.prisma).create(
        ctx.session.user.id,
        input.districtId,
        input.name,
        input.variant
      );
    }),
});
