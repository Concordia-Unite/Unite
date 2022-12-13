import { CallStatus } from "@enums/call-status";
import { PlacementRequestStatus } from "@enums/placement-request-status";
import { Role } from "@enums/role";
import { DistrictRepo } from "@server/repositories/district";
import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const districtRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await new DistrictRepo(ctx.prisma).all();
  }),

  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    return await new DistrictRepo(ctx.prisma).getByUserId(ctx.session.user.id);
  }),

  updateRequestStatus: protectedProcedure
    .input(
      z.object({
        requestId: z.number(),
        status: z.nativeEnum(PlacementRequestStatus),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await new DistrictRepo(ctx.prisma).updateRequestStatus(
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
        districtId: z.number(),
        role: z.nativeEnum(Role),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (
        (
          await ctx.prisma.user
            .findUnique({ where: { id: ctx.session.user.id } })
            .districtMemberOf()
        )?.role === Role.Admin.valueOf()
      ) {
        return await new DistrictRepo(ctx.prisma).addMember(
          input.email,
          input.districtId,
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
            .districtMemberOf()
        )?.role === Role.Admin.valueOf()
      ) {
        return await new DistrictRepo(ctx.prisma).deleteMember(input.userId);
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
            .districtMemberOf()
        )?.role === Role.Admin.valueOf()
      ) {
        return await new DistrictRepo(ctx.prisma).updateMemberRole(
          input.userId,
          input.role
        );
      }
    }),
  getAllCalls: protectedProcedure.query(async ({ ctx }) => {
    const repo = new DistrictRepo(ctx.prisma);

    return await repo.getAllCalls(
      (await repo.getByUserId(ctx.session.user.id))?.id ?? -1
    );
  }),

  updateCallStatus: protectedProcedure
    .input(
      z.object({
        callId: z.number(),
        status: z.nativeEnum(CallStatus),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await new DistrictRepo(ctx.prisma).updateCall(
        input.callId,
        input.status
      );
    }),
});
