-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientName` VARCHAR(191) NOT NULL,
    `clientPhoneNumber` VARCHAR(191) NOT NULL,
    `productImageName` VARCHAR(191) NOT NULL,
    `clientWilaya` VARCHAR(191) NOT NULL,
    `paymentCheckImage` VARCHAR(191) NOT NULL,
    `productSize` VARCHAR(191) NOT NULL,
    `productQuantity` INTEGER NOT NULL,
    `confirmedByAdmin` BOOLEAN NOT NULL,
    `productId` INTEGER NOT NULL,

    UNIQUE INDEX `Order_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
