-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `description` TEXT NOT NULL,
    `price` INTEGER NOT NULL DEFAULT 0,
    `images` VARCHAR(191) NOT NULL DEFAULT '',
    `sizes` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `categoryId` INTEGER NOT NULL DEFAULT -1,

    INDEX `Product_categoryId_fkey`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientName` VARCHAR(191) NOT NULL DEFAULT '',
    `clientPhoneNumber` VARCHAR(191) NOT NULL DEFAULT '',
    `productImageName` VARCHAR(191) NOT NULL DEFAULT '',
    `clientWilaya` VARCHAR(191) NOT NULL DEFAULT '',
    `paymentCheckImage` VARCHAR(191) NOT NULL DEFAULT '',
    `productSize` VARCHAR(191) NOT NULL DEFAULT '',
    `productQuantity` INTEGER NOT NULL DEFAULT 1,
    `confirmedByAdmin` BOOLEAN NOT NULL DEFAULT false,
    `product_Id` INTEGER NOT NULL DEFAULT -1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `orderCost` VARCHAR(191) NOT NULL DEFAULT '',
    `display` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_product_Id_fkey` FOREIGN KEY (`product_Id`) REFERENCES `Product`(`id`) ON DELETE SET DEFAULT ON UPDATE CASCADE;
