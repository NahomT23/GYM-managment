/*
  Warnings:

  - You are about to drop the column `password` on the `member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "employe" ADD COLUMN     "password" TEXT;

-- AlterTable
ALTER TABLE "member" DROP COLUMN "password";
