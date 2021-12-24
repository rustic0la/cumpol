/*
  Warnings:

  - You are about to drop the column `complPercent` on the `Domain` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Domain` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Domain` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Domain` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `domainDataId` to the `Domain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userDataId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Domain" DROP CONSTRAINT "Domain_userId_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Domain" DROP COLUMN "complPercent",
DROP COLUMN "createdAt",
DROP COLUMN "title",
DROP COLUMN "userId",
ADD COLUMN     "domainDataId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
DROP COLUMN "username",
ADD COLUMN     "userDataId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserData" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DomainData" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "complPercent" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DomainData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserData_username_key" ON "UserData"("username");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userDataId_fkey" FOREIGN KEY ("userDataId") REFERENCES "UserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomainData" ADD CONSTRAINT "DomainData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Domain" ADD CONSTRAINT "Domain_domainDataId_fkey" FOREIGN KEY ("domainDataId") REFERENCES "DomainData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
