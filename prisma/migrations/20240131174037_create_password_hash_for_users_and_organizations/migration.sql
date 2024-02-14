/*
  Warnings:

  - Added the required column `password_hash` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `orgs` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "password_hash" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password_hash" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
