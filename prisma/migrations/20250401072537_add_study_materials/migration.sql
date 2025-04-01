-- CreateEnum
CREATE TYPE "StudyMaterialsCategory" AS ENUM ('BOOKS', 'RECORDINGS', 'courses', 'SESSIONS');

-- CreateTable
CREATE TABLE "studyMaterials" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "StudyMaterialsCategory" NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "studyMaterials_pkey" PRIMARY KEY ("id")
);
