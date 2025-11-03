/*
  Warnings:

  - Made the column `role` on table `Invite` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Invite" ALTER COLUMN "role" SET NOT NULL;
