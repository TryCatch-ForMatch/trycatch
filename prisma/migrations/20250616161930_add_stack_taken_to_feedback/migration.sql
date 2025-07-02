-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "stackTakenId" TEXT;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_stackTakenId_fkey" FOREIGN KEY ("stackTakenId") REFERENCES "StackTaken"("id") ON DELETE SET NULL ON UPDATE CASCADE;
