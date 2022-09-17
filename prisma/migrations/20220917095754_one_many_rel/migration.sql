/*
  Warnings:

  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `product_Id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Order_productId_key` ON `Order`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `productId`,
    ADD COLUMN `product_Id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_product_Id_fkey` FOREIGN KEY (`product_Id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
