import { DistrictRepo } from "@server/repositories/district";
import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const districtRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await new DistrictRepo(ctx.prisma).all();
  }),
});
