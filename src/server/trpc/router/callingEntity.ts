import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import {
  Classroom,
  HealthCoverage,
  HealthPlan,
  HousingAllowanceType,
  Position,
  SocialSecurityContribution,
  StateCode,
  Variant,
} from "@prisma/client";
import { TRPCError } from "@trpc/server";

const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const entity = await ctx.prisma.callingEntity.findFirst({
    where: {
      admin: {
        userId: ctx.session.user.id,
      },
    },
  });

  if (!entity) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      entity: entity,
    },
  });
});

export const callingEntityRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        districtId: z.string().uuid(),
        variant: z.nativeEnum(Variant),
        address: z.object({
          houseNumber: z.string().regex(/[0-9]/),
          street: z.string(),
          city: z.string(),
          state: z.nativeEnum(StateCode),
          country: z.string(),
          zipCode: z.string().regex(/[0-9]/),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const district = await ctx.prisma.district.findUniqueOrThrow({
        where: {
          id: input.districtId,
        },
        select: {
          region: true,
        },
      });
      const { create } = ctx.prisma.callingEntity;
      return await create({
        data: {
          name: input.name,
          variant: input.variant,
          address: {
            create: input.address,
          },
          district: {
            connect: {
              id: input.districtId,
            },
          },
          region: district.region,
          admin: {
            create: {
              user: {
                connect: { id: ctx.session.user.id },
              },
            },
          },
        },
      });
    }),

  getCurrent: adminProcedure.query(({ ctx }) =>
    ctx.prisma.callingEntity.findUnique({
      where: {
        id: ctx.entity.id,
      },
    })
  ),

  getPlacementRequests: adminProcedure.query(({ ctx }) =>
    ctx.prisma.placementRequest.findMany({
      where: {
        callingEntityId: ctx.entity.id,
      },
    })
  ),

  createPlacementRequest: adminProcedure
    .input(
      z.object({
        position: z.nativeEnum(Position),
        gradeIds: z.string().uuid().array(),
        subjectIds: z.string().uuid().array(),
        classroom: z.nativeEnum(Classroom),
        description: z.string(),
        startDate: z.date(),
        isTenured: z.boolean(),
        isFullTime: z.boolean(),
        salary: z.number().min(0).int(),
        socialSecurityContribution: z.nativeEnum(SocialSecurityContribution),
        healthCoverage: z.nativeEnum(HealthCoverage).nullish(),
        healthPlan: z.nativeEnum(HealthPlan).nullish(),
        universityIds: z.string().uuid().array(),
        monthsOfService: z.number().min(9).max(12).nullish(),
        housingAllowance: z.object({
          type: z.nativeEnum(HousingAllowanceType),
          stipend: z.number().min(0).nullish(),
        }),
      })
    )
    .mutation(({ input, ctx }) =>
      ctx.prisma.placementRequest.create({
        data: {
          position: input.position,
          callingEntity: {
            connect: {
              id: ctx.entity.id,
            },
          },
          district: {
            connect: {
              id: ctx.entity.districtId ?? "",
            },
          },
          status: "Pending",
          classroom: input.classroom,
          grades: {
            connect: input.gradeIds.map((grade) => ({ id: grade })),
          },
          subjects: {
            connect: input.subjectIds.map((subject) => ({ id: subject })),
          },
          description: input.description,
          startDate: input.startDate,
          isTenured: input.isTenured,
          isFullTime: input.isFullTime,
          salary: input.salary,
          socialSecurityContribution: input.socialSecurityContribution,
          healthCoverage: input.healthCoverage,
          healthPlan: input.healthPlan,
          monthsOfService: input.monthsOfService,
          housingAllowance: {
            create: input.housingAllowance,
          },
        },
      })
    ),
});
