/*
  Warnings:

  - You are about to drop the column `complPercent` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `domainId` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `collectionId` on the `TodoList` table. All the data in the column will be lost.
  - You are about to drop the column `complPercent` on the `TodoList` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TodoList` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `TodoList` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `TodoList` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `TodoList` table. All the data in the column will be lost.
  - Added the required column `collectionDataId` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `todoListDataId` to the `TodoList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_domainId_fkey";

-- DropForeignKey
ALTER TABLE "TodoList" DROP CONSTRAINT "TodoList_collectionId_fkey";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "complPercent",
DROP COLUMN "createdAt",
DROP COLUMN "domainId",
DROP COLUMN "dueDate",
DROP COLUMN "duration",
DROP COLUMN "title",
ADD COLUMN     "collectionDataId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TodoList" DROP COLUMN "collectionId",
DROP COLUMN "complPercent",
DROP COLUMN "createdAt",
DROP COLUMN "dueDate",
DROP COLUMN "duration",
DROP COLUMN "title",
ADD COLUMN     "todoListDataId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CollectionData" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3),
    "domainId" TEXT NOT NULL,
    "duration" TIMESTAMP(3),
    "complPercent" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CollectionData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TodoListData" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3),
    "collectionId" TEXT NOT NULL,
    "duration" TIMESTAMP(3),
    "complPercent" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TodoListData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollectionData" ADD CONSTRAINT "CollectionData_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_collectionDataId_fkey" FOREIGN KEY ("collectionDataId") REFERENCES "CollectionData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoListData" ADD CONSTRAINT "TodoListData_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoList" ADD CONSTRAINT "TodoList_todoListDataId_fkey" FOREIGN KEY ("todoListDataId") REFERENCES "TodoListData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
