import type { PrismaClient } from "@prisma/client";

export class DistrictRepo {
  public constructor(private client: PrismaClient) {}

  public async all() {
    return await this.client.district.findMany();
  }
}
