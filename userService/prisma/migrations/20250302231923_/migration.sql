/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ADMIN', 'INSTRUCTOR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL;

-- DropTable
DROP TABLE "Admin";
