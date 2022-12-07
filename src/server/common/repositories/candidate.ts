import type { PrismaClient, User } from "@prisma/client";

export class CandidateRepo {
  public constructor(private client: PrismaClient) {}

  public async getByUserId(id: string) {
    return await this.client.candidate.findFirst({
      where: {
        userId: id,
      },
      include: {
        user: true,
        university: true,
        district: true,
      },
    });
  }

  public async updateUserSettings(userId: string, name: string) {
    return await this.client.candidate.update({
      where: {
        userId,
      },
      data: {
        user: {
          update: {
            name,
          },
        },
      },
      include: {
        user: true,
        university: true,
        district: true,
      },
    });
  }

  public async createNonRosteredCandidate(
    userId: string,
    universityId: number
  ) {
    return await this.client.candidate.create({
      data: {
        userId,
        universityId,
      },
      include: {
        user: true,
        university: true,
      },
    });
  }

  public async createRosteredCandidate(userId: string, districtId: number) {
    return await this.client.candidate.create({
      data: {
        userId,
        districtId,
      },
      include: {
        user: true,
        district: true,
      },
    });
  }
}
