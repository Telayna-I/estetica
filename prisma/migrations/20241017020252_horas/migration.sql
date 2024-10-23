/*
  Warnings:

  - Changed the type of `hour` on the `Treatment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `minutes` on the `Treatment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Treatment" DROP COLUMN "hour",
ADD COLUMN     "hour" INTEGER NOT NULL,
DROP COLUMN "minutes",
ADD COLUMN     "minutes" INTEGER NOT NULL;
