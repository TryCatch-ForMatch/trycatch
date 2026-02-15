/*
  Warnings:

  - You are about to drop the column `emailVisible` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVisible",
ADD COLUMN     "portfolioPublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showCertificates" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showEmail" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "showFeedback" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "showGithub" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showLinkedin" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showProjects" BOOLEAN NOT NULL DEFAULT true;
