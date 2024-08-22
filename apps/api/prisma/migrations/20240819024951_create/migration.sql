-- CreateEnum
CREATE TYPE "TokkenType" AS ENUM ('PASSWORD_RECOVERY');

-- CreateEnum
CREATE TYPE "AccountProvider" AS ENUM ('GITHUB');

-- CreateEnum
CREATE TYPE "StatusBudget" AS ENUM ('INPROGRESS', 'PENDENG', 'DONE');

-- CreateEnum
CREATE TYPE "StatusProject" AS ENUM ('BEGIN', 'INPROGRESS', 'PENDING', 'DONE');

-- CreateEnum
CREATE TYPE "PriorityProject" AS ENUM ('URGENT', 'IMPORTANT', 'MEDDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'MEMBER', 'CUSTOMER', 'USER', 'BILLING');

-- CreateEnum
CREATE TYPE "StatusProfile" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "profession" TEXT,
    "position" TEXT,
    "phone_number" TEXT,
    "image_url" TEXT,
    "globalRole" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokkens" (
    "id" TEXT NOT NULL,
    "type" "TokkenType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "tokkens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "provider" "AccountProvider" NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invites" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL,
    "organization_id" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "invites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "domain" TEXT,
    "description" TEXT,
    "should_attrach_users_by_domain" BOOLEAN NOT NULL DEFAULT false,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "status_profile" "StatusProfile" DEFAULT 'ACTIVE',
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "profession" TEXT,
    "position" TEXT,
    "phone_number" TEXT,
    "image" TEXT,
    "status_profile" "StatusProfile" DEFAULT 'ACTIVE',
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT,
    "start_at" TIMESTAMP(3) NOT NULL,
    "finished_at" TIMESTAMP(3) NOT NULL,
    "progress" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "image_url" TEXT,
    "StatusProject" "StatusProject" DEFAULT 'BEGIN',
    "PriorityProject" "PriorityProject" DEFAULT 'MEDDIUM',
    "ownerId" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "organizationId" TEXT,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "start_at" TIMESTAMP(3) NOT NULL,
    "finished_at" TIMESTAMP(3) NOT NULL,
    "progress" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "StatusProject" "StatusProject" DEFAULT 'BEGIN',
    "PriorityProject" "PriorityProject" DEFAULT 'MEDDIUM',
    "project_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_tasks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "estimated_time" TIMESTAMP(3) NOT NULL,
    "progress" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "StatusProject" "StatusProject" DEFAULT 'BEGIN',
    "PriorityProject" "PriorityProject" DEFAULT 'MEDDIUM',
    "tasks_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "sub_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget" (
    "id" TEXT NOT NULL,
    "initial_value" DECIMAL(65,30) NOT NULL,
    "final_value" DECIMAL(65,30) NOT NULL,
    "parcel_number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "client_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "StatusBudget" "StatusBudget",

    CONSTRAINT "budget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_account_id_key" ON "accounts"("provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_userId_key" ON "accounts"("provider", "userId");

-- CreateIndex
CREATE INDEX "invites_email_idx" ON "invites"("email");

-- CreateIndex
CREATE UNIQUE INDEX "invites_email_organization_id_key" ON "invites"("email", "organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_slug_key" ON "organizations"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_domain_key" ON "organizations"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "members_organizationId_userId_key" ON "members"("organizationId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "project_name_key" ON "project"("name");

-- CreateIndex
CREATE UNIQUE INDEX "project_name_ownerId_client_id_organizationId_key" ON "project"("name", "ownerId", "client_id", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_name_key" ON "tasks"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_name_userId_project_id_key" ON "tasks"("name", "userId", "project_id");

-- CreateIndex
CREATE UNIQUE INDEX "sub_tasks_name_key" ON "sub_tasks"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sub_tasks_name_userId_tasks_id_key" ON "sub_tasks"("name", "userId", "tasks_id");

-- AddForeignKey
ALTER TABLE "tokkens" ADD CONSTRAINT "tokkens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_tasks" ADD CONSTRAINT "sub_tasks_tasks_id_fkey" FOREIGN KEY ("tasks_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_tasks" ADD CONSTRAINT "sub_tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
