-- CreateTable
CREATE TABLE "StageSectionImage" (
    "stage_section_image_id" SERIAL NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "StageSectionImage_pkey" PRIMARY KEY ("stage_section_image_id")
);
