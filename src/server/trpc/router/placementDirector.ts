/**
 * placementDirector.ts
 * Ian Kollipara
 * 2022.10.19
 *
 * Placement Director tRPC Router
 */

import { t } from "../trpc";
import { z } from "zod";
import { authedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { PlacementDirectorType } from "@prisma/client";

export const placementDirectorRouter = t.router({
  get: authedProcedure.query(({ ctx }) => {
    try {
      return ctx.prisma.placementDirector.findUniqueOrThrow({
        where: {
          userId: ctx.session.user.id,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No Placement Director associated with userId",
        cause: error,
      });
    }
  }),

  getFull: authedProcedure.query(({ ctx }) => {
    try {
      return ctx.prisma.placementDirector.findUniqueOrThrow({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
          district: true,
          institution: true,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No Placement Director associated with userId",
        cause: error,
      });
    }
  }),
  add: authedProcedure
    .input(
      z.object({
        email: z.string().email(),
        userId: z.string().nullish(),
        type: z.discriminatedUnion("type", [
          z.object({
            type: z.literal(PlacementDirectorType.District),
            districtId: z.string().uuid(),
          }),
          z.object({
            type: z.literal(PlacementDirectorType.Institution),
            institutionId: z.string().uuid(),
          }),
        ]),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.placementDirector.create({
        data: {
          ...input,
          userId: input.userId ?? ctx.session.user.id,
          ...input.type,
        },
      });
    }),
});
