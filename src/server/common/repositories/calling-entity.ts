import type { PrismaClient } from "@prisma/client";
import type { Variant } from "@enums/variant";
import { Role } from "@enums/role";
import type { Position } from "@enums/position";
import type { Grade } from "@enums/grade";
import type { SocialSecurityContribution } from "@enums/social-security-contribution";
import type { HealthCoverage } from "@enums/health-coverage";
import type { HealthPlan } from "@enums/health-plan";
import type { HousingAllowanceVariant } from "@enums/housing-allowance-variant";
import { PlacementRequestStatus } from "@enums/placement-request-status";

export class CallingEntityRepo {
  public constructor(private client: PrismaClient) {}

  public async create(
    userId: string,
    districtId: number,
    name: string,
    variant: Variant
  ) {
    return await this.client.callingEntity.create({
      data: {
        name,
        members: {
          create: [
            {
              userId,
              role: Role.Admin.valueOf(),
            },
          ],
        },
        districtId,
        variant: variant.valueOf(),
      },
    });
  }

  public async getFromUserId(userId: string) {
    return await this.client.callingEntityMembership
      .findFirst({
        where: {
          userId,
        },
      })
      .callingEntity({
        include: {
          members: {
            include: {
              user: true,
            },
          },
          district: true,
          requests: {
            include: {
              districtPlacementRequest: true,
              universityPlacementRequests: true,
            },
          },
        },
      });
  }

  public async addMember(
    email: string,
    callingEntityId: number,
    role: Role,
    name?: string
  ) {
    return await this.client.callingEntityMembership.create({
      data: {
        user: {
          connectOrCreate: {
            where: {
              email,
            },
            create: {
              name: name ?? "",
              email,
            },
          },
        },
        callingEntity: {
          connect: {
            id: callingEntityId,
          },
        },
        role: role.valueOf(),
      },
    });
  }

  public async updateMemberRole(userId: string, role: Role) {
    return await this.client.callingEntityMembership.update({
      where: {
        userId,
      },
      data: {
        role: role.valueOf(),
      },
    });
  }

  public async deleteMember(userId: string) {
    return await this.client.callingEntityMembership.delete({
      where: {
        userId,
      },
    });
  }

  public async getMembers(callingEntityId: number) {
    return await this.client.callingEntityMembership.findMany({
      where: {
        callingEntityId,
      },
      include: {
        user: true,
      },
    });
  }

  public async createPlacementRequest(
    callingEntityId: number,
    districtId: number,
    position: Position,
    grades: Grade[],
    subject: string,
    description: string,
    isTenured: boolean,
    isFullTime: boolean,
    salary: number,
    socialSecurityContribution: SocialSecurityContribution,
    housingAllowance: { type: HousingAllowanceVariant; stipend?: number },
    universityIds: number[],
    healthCoverage?: HealthCoverage,
    healthPlan?: HealthPlan,
    monthsOfService?: number,
    startDate?: Date
  ) {
    return await this.client.placementRequest.create({
      data: {
        position: {
          connect: {
            position: position.valueOf(),
          },
        },
        grades: {
          connectOrCreate: grades.map((grade) => ({
            where: {
              grade: grade.valueOf(),
            },
            create: {
              grade: grade.valueOf(),
            },
          })),
        },
        requestee: {
          connect: {
            id: callingEntityId,
          },
        },
        subject,
        description,
        startDate,
        isTenured,
        isFullTime,
        salary,
        socialSecurityContribution: socialSecurityContribution.valueOf(),
        healthCoverage: healthCoverage?.valueOf(),
        healthPlan: healthPlan?.valueOf(),
        monthsOfService,
        housingAllowance: {
          create: {
            type: housingAllowance.type,
            stipend: housingAllowance.stipend,
          },
        },
        universityPlacementRequests: {
          create: universityIds.map((uniId) => ({
            university: {
              connect: {
                id: uniId,
              },
            },
            status: PlacementRequestStatus.Pending.valueOf(),
          })),
        },
        districtPlacementRequest: {
          create: {
            district: {
              connect: {
                id: districtId,
              },
            },
            status: PlacementRequestStatus.Pending,
          },
        },
      },
    });
  }
}
