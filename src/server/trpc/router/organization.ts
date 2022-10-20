/**
 * organization.ts
 * Ian Kollipara
 * 2022.10.19
 *
 * Organization tRPC Router
 */

import { t } from "../trpc";
import { authedProcedure } from "../trpc";
import { z } from "zod";
import {
  ClassroomType,
  Grade,
  HealthCoverage,
  HealthPlan,
  HousingAllowance,
  OrganizationType,
  Position,
  Region,
  SocialSecurityContribution,
  StateCode,
  Subject,
} from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { Decimal } from "@prisma/client/runtime";

const adminProcedure = authedProcedure.use(async ({ ctx, next }) => {
  const organization = await ctx.prisma.organization.findFirst({
    where: {
      admins: {
        some: {
          userId: ctx.session.user.id,
        },
      },
    },
  });
  if (!organization) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: { ...ctx, organization: organization },
  });
});

export const organizationRouter = t.router({
  getById: authedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.organization.findUniqueOrThrow({
        where: {
          id: input.id,
        },
      });
    }),
  getByIdFull: authedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.organization.findUniqueOrThrow({
        where: {
          id: input.id,
        },
        include: {
          admins: true,
          jobs: true,
          address: true,
          district: true,
        },
      });
    }),
  add: authedProcedure
    .input(
      z.object({
        name: z.string(),
        region: z.nativeEnum(Region),
        type: z.nativeEnum(OrganizationType),
        districtId: z.string().uuid(),
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
      return ctx.prisma.organization.create({
        data: {
          name: input.name,
          region: input.region,
          type: input.type,
          district: {
            connect: {
              id: input.districtId,
            },
          },
          address: {
            create: {
              ...input.address,
            },
          },
          admins: {
            create: [
              {
                userId: ctx.session.user.id,
                type: "Organization",
              },
            ],
          },
        },
      });
    }),
  addJob: adminProcedure
    .input(
      z.object({
        position: z.nativeEnum(Position),
        classroomType: z.nativeEnum(ClassroomType),
        grades: z.nativeEnum(Grade).array(),
        subjects: z.nativeEnum(Subject).array(),
        description: z.string().default(""),
        startDate: z.date().nullish(),
        isTenured: z.boolean().nullish(),
        isFullTime: z.boolean().nullish(),
        salary: z.number().transform((value) => new Decimal(value)),
        socialSecurityContrib: z.nativeEnum(SocialSecurityContribution),
        housingAllowance: z.nativeEnum(HousingAllowance).nullish(),
        healthCoverage: z.nativeEnum(HealthCoverage).nullish(),
        healthPlan: z.nativeEnum(HealthPlan).nullish(),
        monthsOfService: z.number().min(9).max(12).nullish(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.job.create({
        data: {
          ...input,
          organization: {
            connect: { id: ctx.organization.id },
          },
        },
      });
    }),
});
