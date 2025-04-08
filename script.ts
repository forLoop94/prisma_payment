import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

const main = async () => {
  // write your prisma client queries here

  // const users = await prisma.user.createMany({
  //   data: [
  //     {
  //       name: "Rax",
  //       email: "rx@mail.com",
  //       password: "12345",
  //       role: "STUDENT",
  //       state: "Maine",
  //       gender: "MALE",
  //       age: 20,
  //       yearAdmitted: 2006,
  //     },
  //     {
  //       name: "Becky",
  //       email: "be@mail.com",
  //       password: "12345",
  //       role: "STUDENT",
  //       state: "Maine",
  //       gender: "FEMALE",
  //       age: 19,
  //       yearAdmitted: 2003,
  //     },
  //     {
  //       name: "Dest",
  //       email: "dt@mail.com",
  //       password: "12345",
  //       role: "STUDENT",
  //       state: "Texas",
  //       gender: "FEMALE",
  //       age: 18,
  //       yearAdmitted: 2009,
  //     },
  //     {
  //       name: "Paul",
  //       email: "pl@mail.com",
  //       password: "12345",
  //       role: "LECTURER",
  //       state: "Texas",
  //       gender: "MALE",
  //       age: 38,
  //       yearAdmitted: 2008,
  //     },
  //     {
  //       name: "Wisdom",
  //       email: "ws@mail.com",
  //       password: "12345",
  //       role: "STUDENT",
  //       state: "Vermont",
  //       gender: "MALE",
  //       age: 20,
  //       yearAdmitted: 2015,
  //     },
  //     {
  //       name: "Ris",
  //       email: "rs@mail.com",
  //       password: "12345",
  //       role: "LECTURER",
  //       state: "Vermont",
  //       gender: "MALE",
  //       age: 27,
  //       yearAdmitted: 2017,
  //     },
  //     {
  //       name: "Patience",
  //       email: "pn@mail.com",
  //       password: "12345",
  //       role: "LECTURER",
  //       state: "Utah",
  //       gender: "FEMALE",
  //       age: 30,
  //       yearAdmitted: 2018,
  //     },
  //     {
  //       name: "Priest",
  //       email: "pi@mail.com",
  //       password: "12345",
  //       role: "STUDENT",
  //       state: "Maine",
  //       gender: "MALE",
  //       age: 21,
  //       yearAdmitted: 2024,
  //     },
  //     {
  //       name: "Christian",
  //       email: "cs@mail.com",
  //       password: "12345",
  //       role: "LECTURER",
  //       state: "Texas",
  //       gender: "MALE",
  //       age: 35,
  //       yearAdmitted: 2025,
  //     },
  //   ],
  // });
  // console.log(users);

  const users = await prisma.user.findMany();
  console.log(users);
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
// 24064b91-1e05-45a7-82a0-a942a81ae82c - React course

// 5cbdb74e-63fd-4c8a-9b27-95bebed6a0b6 - grade 75A
// 603a2ac7-98e6-44c2-9d0b-c19645d33d26 - javacript book
// 98b84015-52c0-4751-8878-eaef46e21541 - react recording
