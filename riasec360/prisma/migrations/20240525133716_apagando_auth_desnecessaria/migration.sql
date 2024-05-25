/*
  Warnings:

  - You are about to drop the column `login` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Authenticator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Authenticator` DROP FOREIGN KEY `Authenticator_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropIndex
DROP INDEX `login` ON `usuario`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `login`,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `emailVerified` DATETIME(3) NULL,
    MODIFY `senha` VARCHAR(200) NULL;

-- DropTable
DROP TABLE `Account`;

-- DropTable
DROP TABLE `Authenticator`;

-- DropTable
DROP TABLE `Session`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `VerificationToken`;

-- CreateTable
CREATE TABLE `sessao` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sessao_sessionToken_key`(`sessionToken`),
    INDEX `sessao_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `usuario_email_key` ON `usuario`(`email`);

-- AddForeignKey
ALTER TABLE `sessao` ADD CONSTRAINT `sessao_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usuario`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
