-- CreateEnum
CREATE TYPE "FeedbackAttrEnum" AS ENUM ('COMUNICA_IMPEDIMENTOS', 'ENTREGA_O_COMBINADO', 'APOIA_A_EQUIPE', 'PERGUNTA_ANTES_DE_DECIDIR', 'RECEBE_REVISAO_BEM', 'AUTONOMIA_NA_STACK');

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "hiddenByAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hiddenReason" TEXT,
ADD COLUMN     "publicationAllowed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "publishedByReceiver" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "anonymous" SET DEFAULT true;

-- CreateTable
CREATE TABLE "FeedbackAttribute" (
    "id" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,
    "attribute" "FeedbackAttrEnum" NOT NULL,

    CONSTRAINT "FeedbackAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FeedbackAttribute_attribute_idx" ON "FeedbackAttribute"("attribute");

-- CreateIndex
CREATE UNIQUE INDEX "FeedbackAttribute_feedbackId_attribute_key" ON "FeedbackAttribute"("feedbackId", "attribute");

-- CreateIndex
CREATE INDEX "Feedback_toUserId_hiddenByAdmin_idx" ON "Feedback"("toUserId", "hiddenByAdmin");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_projectId_fromUserId_toUserId_key" ON "Feedback"("projectId", "fromUserId", "toUserId");

-- AddForeignKey
ALTER TABLE "FeedbackAttribute" ADD CONSTRAINT "FeedbackAttribute_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

