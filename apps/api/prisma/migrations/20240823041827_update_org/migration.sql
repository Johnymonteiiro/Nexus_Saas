-- CreateEnum
CREATE TYPE "StatusOrganization" AS ENUM ('ACTIVE', 'ARCHIVED');

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "archived_at" TIMESTAMP(3),
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "status" "StatusOrganization" DEFAULT 'ACTIVE';
