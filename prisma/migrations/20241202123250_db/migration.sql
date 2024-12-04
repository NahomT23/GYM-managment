/*
  Warnings:

  - Added the required column `gymId` to the `employe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employe" ADD COLUMN     "gymId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "member" ADD COLUMN     "gymId" TEXT;

-- CreateTable
CREATE TABLE "Gym" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "Gym_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gym_adminId_key" ON "Gym"("adminId");

-- AddForeignKey
ALTER TABLE "Gym" ADD CONSTRAINT "Gym_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employe" ADD CONSTRAINT "employe_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("id") ON DELETE SET NULL ON UPDATE CASCADE;
