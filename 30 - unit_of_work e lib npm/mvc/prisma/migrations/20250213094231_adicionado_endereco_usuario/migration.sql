/*
  Warnings:

  - Added the required column `endereco` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `endereco` TEXT NOT NULL;
