-- AlterEnum
ALTER TYPE "public"."UserRole" ADD VALUE 'MENTOR';

-- AlterTable
ALTER TABLE "public"."Invite" ADD COLUMN     "role" "public"."UserRole";
