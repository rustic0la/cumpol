/*
  Warnings:

  - You are about to drop the column `domainCollectionsId` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `userDomainsId` on the `Domain` table. All the data in the column will be lost.
  - You are about to drop the column `todoListTodosId` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `collectionTodoListsId` on the `TodoList` table. All the data in the column will be lost.
  - You are about to drop the `CollectionTodoLists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DomainCollections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TodoListTodos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserDomains` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `domainId` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Domain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `todoListId` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collectionId` to the `TodoList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_domainCollectionsId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionTodoLists" DROP CONSTRAINT "CollectionTodoLists_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "Domain" DROP CONSTRAINT "Domain_userDomainsId_fkey";

-- DropForeignKey
ALTER TABLE "DomainCollections" DROP CONSTRAINT "DomainCollections_domainId_fkey";

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_todoListTodosId_fkey";

-- DropForeignKey
ALTER TABLE "TodoList" DROP CONSTRAINT "TodoList_collectionTodoListsId_fkey";

-- DropForeignKey
ALTER TABLE "TodoListTodos" DROP CONSTRAINT "TodoListTodos_todoListId_fkey";

-- DropForeignKey
ALTER TABLE "UserDomains" DROP CONSTRAINT "UserDomains_userId_fkey";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "domainCollectionsId",
ADD COLUMN     "domainId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Domain" DROP COLUMN "userDomainsId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "todoListTodosId",
ADD COLUMN     "todoListId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TodoList" DROP COLUMN "collectionTodoListsId",
ADD COLUMN     "collectionId" TEXT NOT NULL;

-- DropTable
DROP TABLE "CollectionTodoLists";

-- DropTable
DROP TABLE "DomainCollections";

-- DropTable
DROP TABLE "TodoListTodos";

-- DropTable
DROP TABLE "UserDomains";

-- AddForeignKey
ALTER TABLE "Domain" ADD CONSTRAINT "Domain_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoList" ADD CONSTRAINT "TodoList_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_todoListId_fkey" FOREIGN KEY ("todoListId") REFERENCES "TodoList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
