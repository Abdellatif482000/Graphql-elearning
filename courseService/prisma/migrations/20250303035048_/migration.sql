/*
  Warnings:

  - You are about to drop the `Courses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Paragraph" DROP CONSTRAINT "Paragraph_coursesCourseID_fkey";

-- DropTable
DROP TABLE "Courses";

-- CreateTable
CREATE TABLE "Course" (
    "courseID" TEXT NOT NULL,
    "instructorId" TEXT NOT NULL,
    "courseTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("courseID")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "enrollmentID" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "enrolledAt" TEXT NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("enrollmentID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_courseID_key" ON "Course"("courseID");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_enrollmentID_key" ON "Enrollment"("enrollmentID");

-- AddForeignKey
ALTER TABLE "Paragraph" ADD CONSTRAINT "Paragraph_coursesCourseID_fkey" FOREIGN KEY ("coursesCourseID") REFERENCES "Course"("courseID") ON DELETE SET NULL ON UPDATE CASCADE;
