import type { PrismaClient } from "@prisma/client";
import type { Variant } from "@enums/variant";
import { Role } from "@enums/role";

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
}
