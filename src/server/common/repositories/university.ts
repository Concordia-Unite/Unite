import type { PrismaClient } from "@prisma/client";

export class UniversityRepo {
  public constructor(private client: PrismaClient) {}

  public async all() {
    return await this.client.university.findMany();
  }
}
