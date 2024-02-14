/*
  Warnings:

  - You are about to drop the column `city` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `requirements` on the `pets` table. All the data in the column will be lost.
  - Added the required column `cep` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsapp` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Made the column `role` on table `orgs` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `city` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Made the column `energy` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `pets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "city",
DROP COLUMN "phone",
DROP COLUMN "state",
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "whatsapp" TEXT NOT NULL,
ALTER COLUMN "role" SET NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "requirements",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ALTER COLUMN "energy" SET NOT NULL,
ALTER COLUMN "size" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;

-- CreateTable
CREATE TABLE "requirements" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "requirements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "requirements" ADD CONSTRAINT "requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
