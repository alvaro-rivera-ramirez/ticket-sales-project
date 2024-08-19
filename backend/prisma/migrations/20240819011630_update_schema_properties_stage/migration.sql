/*
  Warnings:

  - You are about to drop the column `stagePartsImg` on the `Stage` table. All the data in the column will be lost.
  - Added the required column `stagePartsImg` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "stagePartsImg" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Stage" DROP COLUMN "stagePartsImg";
