/*
  Warnings:

  - Added the required column `minutes` to the `Treatment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Treatment" ADD COLUMN     "minutes" TEXT NOT NULL;
