/**
 * job.ts
 * Ian Kollipara
 * 2022.10.19
 *
 * Job tRPC Router
 */

import { t } from "../trpc";
import { authedProcedure } from "../trpc";
import { z } from "zod";

export const jobRouter = t.router({
  getById: authedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.job.findUniqueOrThrow({
        where: {
          id: input.id,
        },
      });
    }),
});
