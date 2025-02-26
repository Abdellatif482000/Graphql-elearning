/*
  Warnings:

  - Added the required column `quizID` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "quizID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_quizID_fkey" FOREIGN KEY ("quizID") REFERENCES "Quiz"("quizID") ON DELETE RESTRICT ON UPDATE CASCADE;
