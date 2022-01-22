/*
  Warnings:

  - You are about to drop the column `favicon` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `hostname` on the `Meta` table. All the data in the column will be lost.
  - You are about to drop the column `todoListId` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the `TodoList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `checkListId` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_todoListId_fkey";

-- DropForeignKey
ALTER TABLE "TodoList" DROP CONSTRAINT "TodoList_topicId_fkey";

-- AlterTable
ALTER TABLE "Meta" DROP COLUMN "favicon",
DROP COLUMN "hostname";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "todoListId",
ADD COLUMN     "checkListId" TEXT NOT NULL;

-- DropTable
DROP TABLE "TodoList";

-- CreateTable
CREATE TABLE "CheckList" (
    "id" TEXT NOT NULL,
    "complPercent" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3),
    "duration" TIMESTAMP(3),
    "title" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,

    CONSTRAINT "CheckList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CheckList" ADD CONSTRAINT "CheckList_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_checkListId_fkey" FOREIGN KEY ("checkListId") REFERENCES "CheckList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
