"use server";
import { saltAndHashPassword } from "@/lib/passwords";
import { Prisma, usuario } from "@prisma/client";
import prisma from "@/db/prisma";
import { getServerSession } from "next-auth";
import { Usuario } from "@/app/types/types";

export async function elevateToAdmin(userId: number) {
  try {
    const data_atual = new Date();
    await prisma.usuario.update({
      where: { id_user: userId },
      data: { privilegio: "administrador", data_atualizacao: data_atual },
    });
  } catch (error) {
    console.error("Error elevating user to admin:", error);
  }
}

export async function updateUserPassword(userId: number, senha: string) {
  try {
    const senhaHashed = await saltAndHashPassword(senha);
    const data_atual = new Date();

    await prisma.usuario.update({
      where: { id_user: userId },
      data: { senha: senhaHashed, data_atualizacao: data_atual },
    });
  } catch (error) {
    console.error("Error updating user password:", error);
  }
}

export async function updateUserEmail(userId: number, newEmail: string) {
  try {
    const data_atual = new Date();

    await prisma.usuario.update({
      where: { id_user: userId },
      data: { email: newEmail, data_atualizacao: data_atual },
    });
  } catch (error) {
    console.error("Error updating user email:", error);
  }
}
