/*
  Warnings:

  - Added the required column `orderCost` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `orderCost` VARCHAR(191) NOT NULL;
