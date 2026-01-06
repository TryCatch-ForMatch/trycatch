/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `InviteRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "InviteRequest_email_key" ON "InviteRequest"("email");
