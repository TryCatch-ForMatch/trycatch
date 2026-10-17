-- AlterEnum
BEGIN;
CREATE TYPE "FeedbackAttrEnum_new" AS ENUM ('COMUNICA_IMPEDIMENTOS', 'ENTREGA_O_COMBINADO', 'ENTREGA_NO_PRAZO', 'APOIA_A_EQUIPE', 'PERGUNTA_ANTES_DE_DECIDIR', 'RECEBE_REVISAO', 'ADAPTA_A_MUDANCA');
ALTER TABLE "FeedbackAttribute" ALTER COLUMN "attribute" TYPE "FeedbackAttrEnum_new" USING ("attribute"::text::"FeedbackAttrEnum_new");
ALTER TYPE "FeedbackAttrEnum" RENAME TO "FeedbackAttrEnum_old";
ALTER TYPE "FeedbackAttrEnum_new" RENAME TO "FeedbackAttrEnum";
DROP TYPE "public"."FeedbackAttrEnum_old";
COMMIT;

