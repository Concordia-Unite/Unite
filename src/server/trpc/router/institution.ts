/**
 * institution.ts
 * Ian Kollipara
 * 2022.10.19
 *
 * Institution tRPC Router
 */

import { t } from "../trpc";
import { z } from "zod";
import { authedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { Position, StateCode } from "@prisma/client";

export const institutionRouter = t.router({
  getById: authedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(({ input, ctx }) => {
      try {
        return ctx.prisma.institution.findUniqueOrThrow({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Not institution with id ${input.id}`,
          cause: error,
        });
      }
    }),
  getFull: authedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(({ input, ctx }) => {
      try {
        return ctx.prisma.institution.findUniqueOrThrow({
          where: {
            id: input.id,
          },
          include: {
            address: true,
            admins: true,
            placementDirectors: true,
            students: {
              include: {
                candidate: true,
              },
            },
            candidates: true,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Not institution with id ${input.id}`,
          cause: error,
        });
      }
    }),
  add: authedProcedure
    .input(
      z.object({
        name: z.string(),
        website: z.string().url().nullish(),
        address: z.object({
          houseNumber: z.string().regex(/[0-9]/),
          street: z.string(),
          state: z.nativeEnum(StateCode),
          zipCode: z.string().length(5).regex(/[0-9]/),
          country: z.string().default("US"),
        }),
        positions: z.array(z.nativeEnum(Position)),
      })
    )
    .mutation(({ input, ctx }) => {
      ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          type: "Admin",
        },
      });
      return ctx.prisma.institution.create({
        data: {
          name: input.name,
          website: input.website ?? "",
          positions: input.positions,
          address: {
            create: {
              ...input.address,
            },
          },
          admins: {
            create: [
              {
                userId: ctx.session.user.id,
                type: "Institution",
              },
            ],
          },
        },
      });
    }),
});
