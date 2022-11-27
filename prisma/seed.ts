import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const subjects = ["Math", "Science", "Social Studies", "English", "Music", "Religion", "Theology"]
const grades = ["Kindergarten", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "Preschool", "Toddler", "Pre-K"]

async function main() {
  await prisma.subject.createMany({
    data: subjects.map(subject => ({ name: subject }))
  });

  await prisma.grade.createMany({
    data: grades.map(grade => ({ grade: grade }))
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })