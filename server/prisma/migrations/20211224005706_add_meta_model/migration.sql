-- CreateTable
CREATE TABLE "Meta" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "img" TEXT,
    "todoId" TEXT NOT NULL,

    CONSTRAINT "Meta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Meta_todoId_key" ON "Meta"("todoId");

-- AddForeignKey
ALTER TABLE "Meta" ADD CONSTRAINT "Meta_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
