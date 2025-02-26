/*
  Warnings:

  - The primary key for the `Answer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Answer` table. All the data in the column will be lost.
  - Made the column `questionID` on table `Answer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionID_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_pkey",
DROP COLUMN "id",
ALTER COLUMN "questionID" SET NOT NULL,
ADD CONSTRAINT "Answer_pkey" PRIMARY KEY ("questionID");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Question"("questionID") ON DELETE RESTRICT ON UPDATE CASCADE;
