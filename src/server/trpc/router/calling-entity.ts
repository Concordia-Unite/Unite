import { Role } from "@enums/role";
import { Variant } from "@enums/variant";
import { CallingEntityRepo } from "@server/repositories/calling-entity";
import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const callingEntityRouter = router({
  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    return await new CallingEntityRepo(ctx.prisma).getFromUserId(
      ctx.session.user.id
    );
  }),

  createOne: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        districtId: z.number(),
        variant: z.nativeEnum(Variant),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await new CallingEntityRepo(ctx.prisma).create(
        ctx.session.user.id,
        input.districtId,
        input.name,
        input.variant
      );
    }),

  getAllMembers: protectedProcedure
    .input(z.object({ callingEntityId: z.number() }))
    .query(
      async ({ input, ctx }) =>
        await new CallingEntityRepo(ctx.prisma).getMembers(
          input.callingEntityId
        )
    ),

  addMember: protectedProcedure
    .input(
      z.object({
        name: z.string().nullable(),
        email: z.string().email(),
        callingEntityId: z.number(),
        role: z.nativeEnum(Role),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (
        (
          await ctx.prisma.user
            .findUnique({ where: { id: ctx.session.user.id } })
            .callingEntityMemberOf()
        )?.role === "admin"
      ) {
        return await new CallingEntityRepo(ctx.prisma).addMember(
          input.email,
          input.callingEntityId,
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
            .callingEntityMemberOf()
        )?.role === "admin"
      ) {
        return await new CallingEntityRepo(ctx.prisma).deleteMember(
          input.userId
        );
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
            .callingEntityMemberOf()
        )?.role === "admin"
      ) {
        return await new CallingEntityRepo(ctx.prisma).updateMemberRole(
          input.userId,
          input.role
        );
      }
    }),
});
