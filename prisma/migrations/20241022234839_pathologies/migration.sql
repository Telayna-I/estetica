/*
  Warnings:

  - You are about to drop the column `recentTreatment` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "recentTreatment",
ADD COLUMN     "pathologies" TEXT;
