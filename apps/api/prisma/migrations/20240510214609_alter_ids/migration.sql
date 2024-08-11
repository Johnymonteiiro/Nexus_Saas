/*
  Warnings:

  - You are about to drop the column `user_id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `invites` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `sub_tasks` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `tokkens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[provider,userId]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `invites` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organizationId,userId]` on the table `members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerId]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerId]` on the table `project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,ownerId,client_id,organizationId]` on the table `project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `sub_tasks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,userId,tasks_id]` on the table `sub_tasks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,userId,project_id]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `tokkens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `invites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `sub_tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `tokkens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "invites" DROP CONSTRAINT "invites_user_id_fkey";

-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_user_id_fkey";

-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sub_tasks" DROP CONSTRAINT "sub_tasks_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tokkens" DROP CONSTRAINT "tokkens_user_id_fkey";

-- DropIndex
DROP INDEX "accounts_provider_user_id_key";

-- DropIndex
DROP INDEX "accounts_user_id_key";

-- DropIndex
DROP INDEX "invites_organization_id_key";

-- DropIndex
DROP INDEX "invites_user_id_key";

-- DropIndex
DROP INDEX "members_organizationId_user_id_key";

-- DropIndex
DROP INDEX "members_user_id_key";

-- DropIndex
DROP INDEX "organizations_user_id_key";

-- DropIndex
DROP INDEX "project_name_user_id_client_id_organizationId_key";

-- DropIndex
DROP INDEX "project_user_id_key";

-- DropIndex
DROP INDEX "sub_tasks_name_user_id_tasks_id_key";

-- DropIndex
DROP INDEX "sub_tasks_user_id_key";

-- DropIndex
DROP INDEX "tasks_name_user_id_project_id_key";

-- DropIndex
DROP INDEX "tasks_user_id_key";

-- DropIndex
DROP INDEX "tokkens_user_id_key";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "invites" DROP COLUMN "user_id",
ADD COLUMN     "role" "Role" NOT NULL,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "members" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "user_id",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "project" DROP COLUMN "user_id",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sub_tasks" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tokkens" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_userId_key" ON "accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_userId_key" ON "accounts"("provider", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "invites_userId_key" ON "invites"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "members_userId_key" ON "members"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "members_organizationId_userId_key" ON "members"("organizationId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_ownerId_key" ON "organizations"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "project_ownerId_key" ON "project"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "project_name_ownerId_client_id_organizationId_key" ON "project"("name", "ownerId", "client_id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "sub_tasks_userId_key" ON "sub_tasks"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "sub_tasks_name_userId_tasks_id_key" ON "sub_tasks"("name", "userId", "tasks_id");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_userId_key" ON "tasks"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_name_userId_project_id_key" ON "tasks"("name", "userId", "project_id");

-- CreateIndex
CREATE UNIQUE INDEX "tokkens_userId_key" ON "tokkens"("userId");

-- AddForeignKey
ALTER TABLE "tokkens" ADD CONSTRAINT "tokkens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_tasks" ADD CONSTRAINT "sub_tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
