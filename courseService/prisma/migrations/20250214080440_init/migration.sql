-- CreateTable
CREATE TABLE "Tutorials" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Tutorials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tutorials_title_key" ON "Tutorials"("title");
