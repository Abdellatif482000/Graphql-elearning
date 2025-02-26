/*
  Warnings:

  - You are about to drop the column `questionId` on the `Answer` table. All the data in the column will be lost.
  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `quizId` on the `Question` table. All the data in the column will be lost.
  - The primary key for the `Quiz` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `quizID` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizId_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "questionId",
ADD COLUMN     "questionID" INTEGER;

-- AlterTable
ALTER TABLE "Question" DROP CONSTRAINT "Question_pkey",
DROP COLUMN "id",
DROP COLUMN "quizId",
ADD COLUMN     "questionID" SERIAL NOT NULL,
ADD COLUMN     "quizID" INTEGER NOT NULL,
ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("questionID");

-- AlterTable
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_pkey",
DROP COLUMN "id",
ADD COLUMN     "quizID" SERIAL NOT NULL,
ADD CONSTRAINT "Quiz_pkey" PRIMARY KEY ("quizID");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizID_fkey" FOREIGN KEY ("quizID") REFERENCES "Quiz"("quizID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Question"("questionID") ON DELETE SET NULL ON UPDATE CASCADE;
