/*
  Warnings:

  - You are about to drop the column `type` on the `Treatment` table. All the data in the column will be lost.
  - Added the required column `treatmentType` to the `Treatment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Treatment" DROP COLUMN "type",
ADD COLUMN     "treatmentType" TEXT NOT NULL;
