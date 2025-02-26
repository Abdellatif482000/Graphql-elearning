/*
  Warnings:

  - You are about to drop the column `content` on the `Question` table. All the data in the column will be lost.
  - Added the required column `question` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionsNum` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalScore` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "content",
ADD COLUMN     "question" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "questionsNum" INTEGER NOT NULL,
ADD COLUMN     "totalScore" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "optionA" TEXT NOT NULL,
    "optionB" TEXT NOT NULL,
    "optionC" TEXT NOT NULL,
    "optionD" TEXT NOT NULL,
    "optionE" TEXT NOT NULL,
    "optionF" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "questionId" INTEGER,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
