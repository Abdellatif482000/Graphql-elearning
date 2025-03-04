/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `asd` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userID]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "userID" DROP DEFAULT,
ALTER COLUMN "userID" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userID");
DROP SEQUENCE "User_userID_seq";

-- DropTable
DROP TABLE "asd";

-- CreateIndex
CREATE UNIQUE INDEX "User_userID_key" ON "User"("userID");
