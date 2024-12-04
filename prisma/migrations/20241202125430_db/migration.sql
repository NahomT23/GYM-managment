/*
  Warnings:

  - You are about to drop the column `adminId` on the `Gym` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminEmail]` on the table `Gym` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminEmail` to the `Gym` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Gym" DROP CONSTRAINT "Gym_adminId_fkey";

-- DropIndex
DROP INDEX "Gym_adminId_key";

-- AlterTable
ALTER TABLE "Gym" DROP COLUMN "adminId",
ADD COLUMN     "adminEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Gym_adminEmail_key" ON "Gym"("adminEmail");

-- AddForeignKey
ALTER TABLE "Gym" ADD CONSTRAINT "Gym_adminEmail_fkey" FOREIGN KEY ("adminEmail") REFERENCES "admin"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
