/**
 * admin.ts
 * Ian Kollipara
 * 2022.10.19
 *
 * Admin tRPC Router
 */

import { t } from "../trpc";
import { authedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { AdminType } from "@prisma/client";

export const adminRouter = t.router({
  get: authedProcedure.query(({ ctx }) => {
    try {
      return ctx.prisma.admin.findUniqueOrThrow({
        where: {
          userId: ctx.session.user.id,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No Admin with the given UserId",
        cause: error,
      });
    }
  }),

  getFull: authedProcedure.query(async ({ ctx }) => {
    try {
      return ctx.prisma.admin.findUniqueOrThrow({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
          institution: true,
          district: true,
          organization: true,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No Admin Found with the given UserId",
        cause: error,
      });
    }
  }),
  add: authedProcedure
    .input(
      z.object({
        userId: z.string().uuid().nullish(),
        type: z.discriminatedUnion("type", [
          z.object({
            type: z.literal(AdminType.Institution),
            institutionId: z.string().uuid(),
          }),
          z.object({
            type: z.literal(AdminType.District),
            districtId: z.string().uuid(),
          }),
          z.object({
            type: z.literal(AdminType.Organization),
            organizationId: z.string().uuid(),
          }),
        ]),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.admin.create({
        data: {
          userId: input.userId ?? ctx.session.user.id,
          ...input.type,
        },
      });
    }),
});
