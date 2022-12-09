import { Grade } from "@enums/grade";
import { HealthCoverage } from "@enums/health-coverage";
import { HealthPlan } from "@enums/health-plan";
import { HousingAllowanceVariant } from "@enums/housing-allowance-variant";
import { Position } from "@enums/position";
import { Role } from "@enums/role";
import { SocialSecurityContribution } from "@enums/social-security-contribution";
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
        )?.role === Role.Admin.valueOf()
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
        )?.role === Role.Admin.valueOf()
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
        )?.role === Role.Admin.valueOf()
      ) {
        return await new CallingEntityRepo(ctx.prisma).updateMemberRole(
          input.userId,
          input.role
        );
      }
    }),

  createPlacementRequest: protectedProcedure
    .input(
      z.object({
        callingEntityId: z.number(),
        districtId: z.number(),
        position: z.nativeEnum(Position),
        grades: z.nativeEnum(Grade).array(),
        subject: z.string(),
        description: z.string(),
        isTenured: z.boolean(),
        isFullTime: z.boolean(),
        salary: z.number(),
        socialSecurityContribution: z.nativeEnum(SocialSecurityContribution),
        housingAllowance: z.object({
          type: z.nativeEnum(HousingAllowanceVariant),
          stipend: z.number().nullish(),
        }),
        universityIds: z.number().array(),
        healthCoverage: z.nativeEnum(HealthCoverage).nullish(),
        healthPlan: z.nativeEnum(HealthPlan).nullish(),
        monthsOfService: z.number().nullish(),
        startDate: z.date().nullish(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const repo = new CallingEntityRepo(ctx.prisma);

      const districtId =
        (await repo.getFromUserId(ctx.session.user.id))?.districtId ?? -1;

      return await repo.createPlacementRequest(
        input.callingEntityId,
        districtId,
        input.position,
        input.grades,
        input.subject,
        input.description,
        input.isTenured,
        input.isFullTime,
        input.salary,
        input.socialSecurityContribution,
        input.housingAllowance,
        input.universityIds,
        input.healthCoverage ?? undefined,
        input.healthPlan ?? undefined,
        input.monthsOfService ?? undefined,
        input.startDate ?? undefined
      );
    }),
});
