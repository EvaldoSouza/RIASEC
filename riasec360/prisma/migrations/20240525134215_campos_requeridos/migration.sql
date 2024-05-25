/*
  Warnings:

  - Made the column `nome` on table `usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data_nasc` on table `usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `senha` on table `usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data_criacao` on table `usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `usuario` MODIFY `nome` VARCHAR(50) NOT NULL,
    MODIFY `data_nasc` DATE NOT NULL,
    MODIFY `senha` VARCHAR(200) NOT NULL,
    MODIFY `data_criacao` TIMESTAMP(0) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL;
