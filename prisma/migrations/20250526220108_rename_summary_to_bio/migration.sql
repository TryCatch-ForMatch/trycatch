/*
  Warnings:

  - You are about to drop the column `summary` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "summary",
ADD COLUMN     "bio" TEXT;
