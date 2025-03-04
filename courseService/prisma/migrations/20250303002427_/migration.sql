/*
  Warnings:

  - The primary key for the `Courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `paragraphs` on the `Courses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseID]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_pkey",
DROP COLUMN "paragraphs",
ALTER COLUMN "courseID" DROP DEFAULT,
ALTER COLUMN "courseID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Courses_pkey" PRIMARY KEY ("courseID");
DROP SEQUENCE "Courses_courseID_seq";

-- CreateTable
CREATE TABLE "Paragraph" (
    "paragID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "coursesCourseID" TEXT,

    CONSTRAINT "Paragraph_pkey" PRIMARY KEY ("paragID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paragraph_paragID_key" ON "Paragraph"("paragID");

-- CreateIndex
CREATE UNIQUE INDEX "Courses_courseID_key" ON "Courses"("courseID");

-- AddForeignKey
ALTER TABLE "Paragraph" ADD CONSTRAINT "Paragraph_coursesCourseID_fkey" FOREIGN KEY ("coursesCourseID") REFERENCES "Courses"("courseID") ON DELETE SET NULL ON UPDATE CASCADE;
