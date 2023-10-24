-- CreateTable
CREATE TABLE `examroom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `period` INTEGER NOT NULL,
    `room` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
