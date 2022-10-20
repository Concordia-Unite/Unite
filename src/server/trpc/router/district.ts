/**
 * district.ts
 * Ian Kollipara
 * 2022.10.19
 *
 * District tRPC Router
 */

import { t } from "../trpc";
import { authedProcedure } from "../trpc";
import { z } from "zod";
import { Region, StateCode } from "@prisma/client";

export const districtRouter = t.router({
  getById: authedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.district.findUniqueOrThrow({
        where: {
          id: input.id,
        },
      });
    }),

  getFull: authedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.district.findUniqueOrThrow({
        where: {
          id: input.id,
        },
        include: {
          admins: true,
          organizations: true,
          placementDirectors: true,
          candidates: true,
        },
      });
    }),
  add: authedProcedure
    .input(
      z.object({
        name: z.string(),
        region: z.nativeEnum(Region),
        address: z.object({
          houseNumber: z.string().regex(/[0-9]/),
          street: z.string(),
          state: z.nativeEnum(StateCode),
          zipCode: z.string().length(5).regex(/[0-9]/),
          country: z.string().default("US"),
        }),
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
      return ctx.prisma.district.create({
        data: {
          name: input.name,
          region: input.region,
          address: {
            create: {
              ...input.address,
            },
          },
          admins: {
            create: [
              {
                userId: ctx.session.user.id,
                type: "District",
              },
            ],
          },
        },
      });
    }),
});
