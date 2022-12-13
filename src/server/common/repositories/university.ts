import { CallStatus } from "@enums/call-status";
import type { PlacementRequestStatus } from "@enums/placement-request-status";
import type { Role } from "@enums/role";
import type { PrismaClient } from "@prisma/client";

export class UniversityRepo {
  public constructor(private client: PrismaClient) {}

  public async all() {
    return await this.client.university.findMany({
      include: {
        positions: true,
      },
    });
  }

  public async getByUserId(userId: string) {
    return await this.client.university.findFirst({
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
      return await this.client.universityPlacementRequest.update({
        where: { id: requestId },
        data: { status },
      });
    }
  }

  public async addMember(
    email: string,
    universityId: number,
    role: Role,
    name?: string
  ) {
    return await this.client.universityMembership.create({
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
        university: {
          connect: {
            id: universityId,
          },
        },
        role: role.valueOf(),
      },
    });
  }

  public async updateMemberRole(userId: string, role: Role) {
    return await this.client.universityMembership.update({
      where: {
        userId,
      },
      data: {
        role: role.valueOf(),
      },
    });
  }

  public async deleteMember(userId: string) {
    return await this.client.universityMembership.delete({ where: { userId } });
  }

  public async getMembers(universityId: number) {
    return await this.client.universityMembership.findMany({
      where: { universityId },
      include: { user: true },
    });
  }

  public async getAllCalls(universityId: number) {
    return await this.client.call.findMany({
      where: {
        candidate: { universityId },
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
