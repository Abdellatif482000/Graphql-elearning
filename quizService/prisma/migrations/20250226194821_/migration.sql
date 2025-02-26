/*
  Warnings:

  - The primary key for the `Answer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Quiz` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[questionID]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[quizID]` on the table `Quiz` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionID_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizID_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_pkey",
ALTER COLUMN "questionID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Answer_pkey" PRIMARY KEY ("questionID");

-- AlterTable
ALTER TABLE "Question" DROP CONSTRAINT "Question_pkey",
ALTER COLUMN "questionID" DROP DEFAULT,
ALTER COLUMN "questionID" SET DATA TYPE TEXT,
ALTER COLUMN "quizID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Question_pkey" PRIMARY KEY ("questionID");
DROP SEQUENCE "Question_questionID_seq";

-- AlterTable
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_pkey",
ALTER COLUMN "quizID" DROP DEFAULT,
ALTER COLUMN "quizID" SET DATA TYPE TEXT,
ADD CONSTRAINT "Quiz_pkey" PRIMARY KEY ("quizID");
DROP SEQUENCE "Quiz_quizID_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Question_questionID_key" ON "Question"("questionID");

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_quizID_key" ON "Quiz"("quizID");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizID_fkey" FOREIGN KEY ("quizID") REFERENCES "Quiz"("quizID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Question"("questionID") ON DELETE RESTRICT ON UPDATE CASCADE;
