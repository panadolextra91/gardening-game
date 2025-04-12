/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[facebookId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlantGrowthState" AS ENUM ('SEED', 'SPROUT', 'YOUNG', 'ADULT', 'DEAD');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "coins" INTEGER NOT NULL DEFAULT 500,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "facebookId" TEXT,
ADD COLUMN     "googleId" TEXT,
ADD COLUMN     "guest" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Garden" (
    "id" SERIAL NOT NULL,
    "gardenNumber" INTEGER NOT NULL,
    "background" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Garden_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pot" (
    "id" SERIAL NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "gardenId" INTEGER NOT NULL,
    "potTypeId" INTEGER NOT NULL,
    "purchasePrice" INTEGER,

    CONSTRAINT "Pot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "plantTypeId" INTEGER NOT NULL,
    "potId" INTEGER NOT NULL,
    "growthState" "PlantGrowthState" NOT NULL DEFAULT 'SEED',
    "currentWaterCount" INTEGER NOT NULL DEFAULT 0,
    "accumulatedSunMin" INTEGER NOT NULL DEFAULT 0,
    "purchasePrice" INTEGER NOT NULL,
    "harvested" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "basePrice" INTEGER NOT NULL,
    "seedToSproutDuration" INTEGER NOT NULL,
    "sproutToYoungDuration" INTEGER NOT NULL,
    "youngToAdultDuration" INTEGER NOT NULL,
    "sproutWaterReq" INTEGER NOT NULL,
    "youngWaterReq" INTEGER NOT NULL,
    "totalSunlightReq" INTEGER NOT NULL,
    "imageSeed" TEXT NOT NULL,
    "imageSprout" TEXT NOT NULL,
    "imageYoung" TEXT NOT NULL,
    "imageAdult" TEXT NOT NULL,

    CONSTRAINT "PlantType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PotType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "PotType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "water" INTEGER NOT NULL DEFAULT 0,
    "fertilizer" INTEGER NOT NULL DEFAULT 0,
    "sunlight" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plant_potId_key" ON "Plant"("potId");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_userId_key" ON "Inventory"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_facebookId_key" ON "User"("facebookId");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- AddForeignKey
ALTER TABLE "Garden" ADD CONSTRAINT "Garden_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pot" ADD CONSTRAINT "Pot_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "Garden"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pot" ADD CONSTRAINT "Pot_potTypeId_fkey" FOREIGN KEY ("potTypeId") REFERENCES "PotType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_plantTypeId_fkey" FOREIGN KEY ("plantTypeId") REFERENCES "PlantType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_potId_fkey" FOREIGN KEY ("potId") REFERENCES "Pot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
