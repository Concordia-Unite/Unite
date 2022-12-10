import { PlacementRequestStatus } from "@enums/placement-request-status";
import { Role } from "@enums/role";
import { UniversityRepo } from "@server/repositories/university";
import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const universityRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await new UniversityRepo(ctx.prisma).all();
  }),

  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    return await new UniversityRepo(ctx.prisma).getByUserId(
      ctx.session.user.id
    );
  }),

  updateRequestStatus: protectedProcedure
    .input(
      z.object({
        requestId: z.number(),
        status: z.nativeEnum(PlacementRequestStatus),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await new UniversityRepo(ctx.prisma).updateRequestStatus(
        ctx.session.user.id,
        input.requestId,
        input.status
      );
    }),
  addMember: protectedProcedure
    .input(
      z.object({
        name: z.string().nullable(),
        email: z.string().email(),
        universityId: z.number(),
        role: z.nativeEnum(Role),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (
        (
          await ctx.prisma.user
            .findUnique({ where: { id: ctx.session.user.id } })
            .universityMemberOf()
        )?.role === Role.Admin.valueOf()
      ) {
        return await new UniversityRepo(ctx.prisma).addMember(
          input.email,
          input.universityId,
          input.role,
          input.name ?? ""
        );
      }
    }),

  deleteMember: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (
        (
          await ctx.prisma.user
            .findUnique({ where: { id: ctx.session.user.id } })
            .universityMemberOf()
        )?.role === Role.Admin.valueOf()
      ) {
        return await new UniversityRepo(ctx.prisma).deleteMember(input.userId);
      }
    }),

  updateMemberRole: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.nativeEnum(Role),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (
        (
          await ctx.prisma.user
            .findUnique({ where: { id: ctx.session.user.id } })
            .universityMemberOf()
        )?.role === Role.Admin.valueOf()
      ) {
        return await new UniversityRepo(ctx.prisma).updateMemberRole(
          input.userId,
          input.role
        );
      }
    }),
});
