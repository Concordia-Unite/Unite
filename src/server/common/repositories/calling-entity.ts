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
}
