/*
  Warnings:

  - Made the column `departmentId` on table `statement` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `statement` DROP FOREIGN KEY `Statement_departmentId_fkey`;

-- AlterTable
ALTER TABLE `statement` MODIFY `departmentId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Statement` ADD CONSTRAINT `Statement_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`departmentId`) ON DELETE CASCADE ON UPDATE CASCADE;
