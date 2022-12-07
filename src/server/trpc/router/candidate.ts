import { CandidateRepo } from "@server/repositories/candidate";
import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const candidateRouter = router({
  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    return await new CandidateRepo(ctx.prisma).getByUserId(ctx.session.user.id);
  }),

  createNew: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        wasRostered: z.boolean(),
        districtId: z.number().nullable(),
        universityId: z.number().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const repo = new CandidateRepo(ctx.prisma);

      if (input.wasRostered && input.districtId) {
        repo.updateUserSettings(ctx.session.user.id, input.name);
        return await repo.createRosteredCandidate(
          ctx.session.user.id,
          input.districtId
        );
      } else {
        repo.updateUserSettings(ctx.session.user.id, input.name);
        return await repo.createNonRosteredCandidate(
          ctx.session.user.id,
          input.universityId as number
        );
      }
    }),
});
