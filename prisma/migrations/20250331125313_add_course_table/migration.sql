/*
  Warnings:

  - Made the column `facultyId` on table `Department` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_facultyId_fkey";

-- AlterTable
ALTER TABLE "Department" ALTER COLUMN "facultyId" SET NOT NULL;

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "description" TEXT,
    "departmentId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grades" (
    "id" TEXT NOT NULL,
    "studentProfileId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "symbol" TEXT NOT NULL,

    CONSTRAINT "Grades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CourseToLecturerProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CourseToLecturerProfile_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Grades_studentProfileId_idx" ON "Grades"("studentProfileId");

-- CreateIndex
CREATE INDEX "Grades_courseId_idx" ON "Grades"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Grades_studentProfileId_courseId_key" ON "Grades"("studentProfileId", "courseId");

-- CreateIndex
CREATE INDEX "_CourseToLecturerProfile_B_index" ON "_CourseToLecturerProfile"("B");

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grades" ADD CONSTRAINT "Grades_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grades" ADD CONSTRAINT "Grades_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToLecturerProfile" ADD CONSTRAINT "_CourseToLecturerProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToLecturerProfile" ADD CONSTRAINT "_CourseToLecturerProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "LecturerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
