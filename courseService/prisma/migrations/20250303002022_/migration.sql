/*
  Warnings:

  - You are about to drop the `Tutorials` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Tutorials";

-- CreateTable
CREATE TABLE "Courses" (
    "courseID" SERIAL NOT NULL,
    "instructorId" TEXT NOT NULL,
    "courseTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "paragraphs" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("courseID")
);
