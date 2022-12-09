import { UniversityRepo } from "@server/repositories/university";
import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const universityRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await new UniversityRepo(ctx.prisma).all();
  }),
});
