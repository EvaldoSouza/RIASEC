/*
  Warnings:

  - You are about to drop the column `fim_aplicacao` on the `aplicacao` table. All the data in the column will be lost.
  - You are about to drop the column `id_respondente` on the `aplicacao` table. All the data in the column will be lost.
  - You are about to drop the column `inicio_aplicacao` on the `aplicacao` table. All the data in the column will be lost.
  - You are about to drop the column `id_aplicacao` on the `resposta_cartao` table. All the data in the column will be lost.
  - You are about to drop the column `resposta` on the `resposta_cartao` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_resposta` on the `resposta_cartao` table. All the data in the column will be lost.
  - Made the column `id_teste` on table `aplicacao` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data_agendamento` on table `aplicacao` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `aplicacao_usuarioId_aplicacao` to the `resposta_cartao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aplicacao_usuarioId_usuario` to the `resposta_cartao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_teste` to the `resposta_cartao` table without a default value. This is not possible if the table is not empty.
  - Made the column `id_cartao` on table `resposta_cartao` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `privilegio` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `aplicacao` DROP COLUMN `fim_aplicacao`,
    DROP COLUMN `id_respondente`,
    DROP COLUMN `inicio_aplicacao`,
    ADD COLUMN `hora_inicial` TIMESTAMP(0) NULL,
    ADD COLUMN `hora_termino` TIMESTAMP(0) NULL,
    MODIFY `id_teste` INTEGER NOT NULL,
    MODIFY `data_agendamento` TIMESTAMP(0) NOT NULL;

-- AlterTable
ALTER TABLE `resposta_cartao` DROP COLUMN `id_aplicacao`,
    DROP COLUMN `resposta`,
    DROP COLUMN `tipo_resposta`,
    ADD COLUMN `aplicacao_usuarioId_aplicacao` INTEGER NOT NULL,
    ADD COLUMN `aplicacao_usuarioId_usuario` INTEGER NOT NULL,
    ADD COLUMN `id_teste` INTEGER NOT NULL,
    ADD COLUMN `resposta_afinidade` VARCHAR(50) NULL,
    ADD COLUMN `resposta_competencia` VARCHAR(50) NULL,
    MODIFY `id_cartao` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `privilegio` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `aplicacao_usuario` (
    `id_aplicacao` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `inicio_testagem` TIMESTAMP(0) NULL,
    `fim_testagem` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id_usuario`, `id_aplicacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `aplicacao` ADD CONSTRAINT `aplicacao_ibfk_2` FOREIGN KEY (`id_grupo`) REFERENCES `grupo`(`id_grupo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `aplicacao` ADD CONSTRAINT `aplicacao_ibfk_3` FOREIGN KEY (`id_teste`) REFERENCES `teste`(`id_teste`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `aplicacao_usuario` ADD CONSTRAINT `aplicacao_usuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `aplicacao_usuario` ADD CONSTRAINT `aplicacao_usuario_ibfk_2` FOREIGN KEY (`id_aplicacao`) REFERENCES `aplicacao`(`id_aplicacao`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `resposta_cartao` ADD CONSTRAINT `resposta_cartao_ibfk_2` FOREIGN KEY (`id_cartao`) REFERENCES `cartao`(`id_cartao`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `resposta_cartao` ADD CONSTRAINT `resposta_cartao_aplicacao_usuarioId_usuario_aplicacao_usuar_fkey` FOREIGN KEY (`aplicacao_usuarioId_usuario`, `aplicacao_usuarioId_aplicacao`) REFERENCES `aplicacao_usuario`(`id_usuario`, `id_aplicacao`) ON DELETE RESTRICT ON UPDATE CASCADE;
