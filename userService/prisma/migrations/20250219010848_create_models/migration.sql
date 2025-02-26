/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "User" (
    "userID" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Score" (
    "scoreID" SERIAL NOT NULL,
    "quizID" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "userID" INTEGER,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("scoreID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE SET NULL ON UPDATE CASCADE;
