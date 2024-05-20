-- CreateTable
CREATE TABLE `aplicacao` (
    `id_aplicacao` INTEGER NOT NULL AUTO_INCREMENT,
    `id_respondente` INTEGER NULL,
    `id_grupo` INTEGER NULL,
    `id_teste` INTEGER NULL,
    `local` VARCHAR(50) NULL,
    `data_agendamento` TIMESTAMP(0) NULL,
    `inicio_aplicacao` TIMESTAMP(0) NULL,
    `fim_aplicacao` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id_aplicacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cartao` (
    `id_cartao` INTEGER NOT NULL AUTO_INCREMENT,
    `pergunta` VARCHAR(300) NULL,
    `tipo` VARCHAR(50) NULL,
    `em_uso` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id_cartao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grupo` (
    `id_grupo` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NULL,
    `descricao` VARCHAR(300) NULL,
    `data_criacao` TIMESTAMP(0) NULL,

    UNIQUE INDEX `nome`(`nome`),
    PRIMARY KEY (`id_grupo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resposta_cartao` (
    `id_resposta` INTEGER NOT NULL AUTO_INCREMENT,
    `id_aplicacao` INTEGER NULL,
    `id_cartao` INTEGER NULL,
    `resposta` VARCHAR(50) NULL,
    `tipo_resposta` VARCHAR(50) NULL,

    PRIMARY KEY (`id_resposta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teste` (
    `id_teste` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(300) NULL,
    `quant_cartoes` INTEGER NULL,
    `data_criacao` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id_teste`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teste_cartao` (
    `id_teste` INTEGER NOT NULL,
    `id_cartao` INTEGER NOT NULL,

    INDEX `id_cartao`(`id_cartao`),
    PRIMARY KEY (`id_teste`, `id_cartao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NULL,
    `data_nasc` DATE NULL,
    `login` VARCHAR(50) NULL,
    `senha` VARCHAR(50) NULL,
    `data_criacao` TIMESTAMP(0) NULL,
    `data_atualizacao` TIMESTAMP(0) NULL,

    UNIQUE INDEX `login`(`login`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario_grupo` (
    `id_usuario` INTEGER NOT NULL,
    `id_grupo` INTEGER NOT NULL,

    INDEX `id_grupo`(`id_grupo`),
    PRIMARY KEY (`id_usuario`, `id_grupo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `teste_cartao` ADD CONSTRAINT `teste_cartao_ibfk_1` FOREIGN KEY (`id_teste`) REFERENCES `teste`(`id_teste`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `teste_cartao` ADD CONSTRAINT `teste_cartao_ibfk_2` FOREIGN KEY (`id_cartao`) REFERENCES `cartao`(`id_cartao`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuario_grupo` ADD CONSTRAINT `usuario_grupo_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuario_grupo` ADD CONSTRAINT `usuario_grupo_ibfk_2` FOREIGN KEY (`id_grupo`) REFERENCES `grupo`(`id_grupo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

