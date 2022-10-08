/**
 * school.ts
 * Ian Kollipara
 * 2022.10.07
 *
 * School tRPC router
 */

import { t } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { States } from "../../../types/address";

export const schoolRouter = t.router({
  getBySid: t.procedure
    .input(z.object({ sid: z.string().cuid() }))
    .query(({ input, ctx }) => {
      try {
        return ctx.prisma.school.findUniqueOrThrow({
          where: {
            sid: input.sid,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `${input.sid} is not a valid School Id`,
          cause: error,
        });
      }
    }),

  getAttendees: t.procedure
    .input(z.object({ sid: z.string().cuid() }))
    .query(({ input, ctx }) => {
      try {
        return ctx.prisma.school.findUniqueOrThrow({
          select: {
            candidates: true,
          },
          where: {
            sid: input.sid,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `${input.sid} is not a valid School Id`,
          cause: error,
        });
      }
    }),

  insertOne: t.procedure
    .input(
      z.object({
        name: z.string(),
        houseNumber: z.string(),
        street: z.string(),
        state: z.nativeEnum(States),
        zipCode: z.string().length(5),
        country: z.string().min(2).max(3).default("US"),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.school.create({
        data: {
          name: input.name,
          houseNumber: input.houseNumber,
          street: input.street,
          state: input.state.valueOf(),
          zipCode: input.zipCode,
          country: input.country,
        },
      });
    }),

  getAll: t.procedure
    .input(z.object({ includeCandidates: z.boolean().default(false) }))
    .query(({ input, ctx }) => {
      return ctx.prisma.school.findMany({
        include: {
          candidates: input.includeCandidates,
        },
      });
    }),
});
