import type { CallStatus } from "@enums/call-status";
import { type PlacementRequestStatus } from "@enums/placement-request-status";
import { type Role } from "@enums/role";
import type { PrismaClient } from "@prisma/client";

export class DistrictRepo {
  public constructor(private client: PrismaClient) {}

  public async all() {
    return await this.client.district.findMany();
  }

  public async getByUserId(userId: string) {
    return await this.client.district.findFirst({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        requests: {
          include: {
            placementRequest: {
              include: {
                requestee: {
                  select: {
                    name: true,
                  },
                },
                grades: true,
              },
            },
          },
        },
      },
    });
  }

  public async updateRequestStatus(
    userId: string,
    requestId: number,
    status: PlacementRequestStatus
  ) {
    if (await this.getByUserId(userId)) {
      return await this.client.districtPlacementRequest.update({
        where: { id: requestId },
        data: { status },
      });
    }
  }

  public async addMember(
    email: string,
    districtId: number,
    role: Role,
    name?: string
  ) {
    return await this.client.districtMembership.create({
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
        district: {
          connect: {
            id: districtId,
          },
        },
        role: role.valueOf(),
      },
    });
  }

  public async updateMemberRole(userId: string, role: Role) {
    return await this.client.districtMembership.update({
      where: {
        userId,
      },
      data: {
        role: role.valueOf(),
      },
    });
  }

  public async deleteMember(userId: string) {
    return await this.client.districtMembership.delete({
      where: {
        userId,
      },
    });
  }

  public async getMembers(districtId: number) {
    return await this.client.districtMembership.findMany({
      where: {
        districtId,
      },
      include: {
        user: true,
      },
    });
  }

  public async getAllCalls(districtId: number) {
    return await this.client.call.findMany({
      where: {
        candidate: { districtId: districtId ?? -1 },
      },
      include: {
        candidate: { include: { user: true } },
        placementRequest: {
          include: { requestee: { include: { district: true } } },
        },
      },
    });
  }

  public async updateCall(callId: number, status: CallStatus) {
    return await this.client.call.update({
      where: { id: callId },
      data: { status },
    });
  }
}
