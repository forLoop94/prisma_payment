import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

const main = async () => {
  // write your prisma client queries here
  // const faculty = await prisma.lecturerProfile.create({
  //   data: {
  //     departmentId: "3a85a3b4-a338-4178-86de-b75e9f8536ba",
  //     userId: "274f2c65-55a2-4646-8203-e2c5d1d2121d",
  //     exp: 13,
  //   },
  // });
  // const student = await prisma.lecturerProfile.delete({
  //   where: {
  //     userId: "9e29cd0f-dac4-4a19-be30-3ad98acb9146",
  //   },
  // });
  // const student = await prisma.studentProfile.findMany();
  // console.log(student);
  //console.log(faculty);
  const student = await prisma.studentProfile.findUnique({
    where: {
      id: "de395d35-474e-423e-9846-f0ab8dc1d4b1",
    },
    include: {
      Department: true,
      owner: true,
    },
  });
  console.log(student);
};

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });

// 90b28e37-95f9-4223-8ddd-10998cbc7e81 - faculty id
// 3a85a3b4-a338-4178-86de-b75e9f8536ba - computer science dept id
// 9e29cd0f-dac4-4a19-be30-3ad98acb9146 - treasure's id - student

// 274f2c65-55a2-4646-8203-e2c5d1d2121d - charles id - lecturer
// 037ef775-1616-4cd5-862e-6db7b9fe5876 - lecturer profile
// de395d35-474e-423e-9846-f0ab8dc1d4b1 = student profile
