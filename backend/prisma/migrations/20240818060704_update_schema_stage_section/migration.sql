/*
  Warnings:

  - Added the required column `stagePartsImg` to the `Stage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `StageSection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stage" ADD COLUMN     "stagePartsImg" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "StageSection" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "StageSection" ADD CONSTRAINT "StageSection_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;
