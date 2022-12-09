import { PrismaClient } from "@prisma/client";
import { Grade } from "../src/types/enums/grade";
import { Position } from "../src/types/enums/position";

const client = new PrismaClient();

async function main() {
  console.log(Object.values);
  Object.values(Grade).map(
    async (grade) =>
      await client.grade.create({
        data: {
          grade,
        },
      })
  );

  Object.values(Position).map(
    async (position) =>
      await client.position.create({
        data: {
          position,
        },
      })
  );
}

main()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  });
