/*
  Warnings:

  - You are about to drop the column `collectionDataId` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `domainDataId` on the `Domain` table. All the data in the column will be lost.
  - You are about to drop the column `todoListId` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `todoListDataId` on the `TodoList` table. All the data in the column will be lost.
  - You are about to drop the column `userDataId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CollectionData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DomainData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TodoListData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserData` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Domain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `TodoList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_collectionDataId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionData" DROP CONSTRAINT "CollectionData_domainId_fkey";

-- DropForeignKey
ALTER TABLE "Domain" DROP CONSTRAINT "Domain_domainDataId_fkey";

-- DropForeignKey
ALTER TABLE "DomainData" DROP CONSTRAINT "DomainData_userId_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_todoListId_fkey";

-- DropForeignKey
ALTER TABLE "TodoList" DROP CONSTRAINT "TodoList_todoListDataId_fkey";

-- DropForeignKey
ALTER TABLE "TodoListData" DROP CONSTRAINT "TodoListData_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userDataId_fkey";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "collectionDataId",
ADD COLUMN     "complPercent" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "domainCollectionsId" TEXT,
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "duration" TIMESTAMP(3),
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Domain" DROP COLUMN "domainDataId",
ADD COLUMN     "complPercent" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "userDomainsId" TEXT;

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "todoListId",
ADD COLUMN     "todoListTodosId" TEXT;

-- AlterTable
ALTER TABLE "TodoList" DROP COLUMN "todoListDataId",
ADD COLUMN     "collectionTodoListsId" TEXT,
ADD COLUMN     "complPercent" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "duration" TIMESTAMP(3),
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userDataId",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "CollectionData";

-- DropTable
DROP TABLE "DomainData";

-- DropTable
DROP TABLE "TodoListData";

-- DropTable
DROP TABLE "UserData";

-- CreateTable
CREATE TABLE "UserDomains" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserDomains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DomainCollections" (
    "id" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,

    CONSTRAINT "DomainCollections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionTodoLists" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "CollectionTodoLists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TodoListTodos" (
    "id" TEXT NOT NULL,
    "todoListId" TEXT NOT NULL,

    CONSTRAINT "TodoListTodos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "UserDomains" ADD CONSTRAINT "UserDomains_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Domain" ADD CONSTRAINT "Domain_userDomainsId_fkey" FOREIGN KEY ("userDomainsId") REFERENCES "UserDomains"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomainCollections" ADD CONSTRAINT "DomainCollections_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_domainCollectionsId_fkey" FOREIGN KEY ("domainCollectionsId") REFERENCES "DomainCollections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionTodoLists" ADD CONSTRAINT "CollectionTodoLists_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoList" ADD CONSTRAINT "TodoList_collectionTodoListsId_fkey" FOREIGN KEY ("collectionTodoListsId") REFERENCES "CollectionTodoLists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoListTodos" ADD CONSTRAINT "TodoListTodos_todoListId_fkey" FOREIGN KEY ("todoListId") REFERENCES "TodoList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_todoListTodosId_fkey" FOREIGN KEY ("todoListTodosId") REFERENCES "TodoListTodos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
