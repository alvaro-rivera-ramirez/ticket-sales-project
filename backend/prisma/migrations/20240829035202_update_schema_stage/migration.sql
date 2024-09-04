/*
  Warnings:

  - You are about to drop the column `stageId` on the `StageSection` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StageSection" DROP CONSTRAINT "StageSection_stageId_fkey";

-- AlterTable
ALTER TABLE "StageSection" DROP COLUMN "stageId";
