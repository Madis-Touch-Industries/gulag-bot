/*
  Warnings:

  - You are about to drop the column `planet` on the `Unit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "planet",
ADD COLUMN     "location" TEXT;
