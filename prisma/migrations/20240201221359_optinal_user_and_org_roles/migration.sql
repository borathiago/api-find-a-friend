-- AlterTable
ALTER TABLE "orgs" ALTER COLUMN "role" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL;
