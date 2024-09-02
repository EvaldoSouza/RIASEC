"use server";

import { saltAndHashPassword } from "@/lib/passwords";
import { Prisma } from "@prisma/client";
import prisma from "@/db/prisma";
import { getServerSession } from "next-auth";
import { Usuario } from "@/app/types/types";

export async function privilegioUsuario() {
  //pegar o estado do usuário aqui
  //   return "user";
  //Tres categorias: adm, user, deslogado
  const session = await getServerSession();
  const userEmail = session?.user?.email;
  if (userEmail) {
    const user = await getUserFromDbWithEmail(userEmail);
    if (user) {
      return user.privilegio;
    }
  }
  return "deslogado";
}

export async function getUserFromDbWithEmail(email: string): Promise<Usuario> {
  try {
    const user = await prisma.usuario.findFirst({ where: { email } });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return user;
  } catch (error) {
    console.log("Algo deu errado ao buscar usuário no banco:", error);
    throw error;
  }
}

export async function getUserByID(id: number): Promise<Usuario> {
  try {
    const user = await prisma.usuario.findUnique({ where: { id_user: id } });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return user;
  } catch (error) {
    console.log("Algo deu errado ao buscar usuário no banco:", error);
    throw error;
  }
}

export async function getAllUsers(): Promise<Usuario[]> {
  try {
    const users = await prisma.usuario.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function nomesParticipantes(
  idsParticipantes: number[]
): Promise<string[]> {
  try {
    const usuarios = await prisma.usuario.findMany({
      where: { id_user: { in: idsParticipantes } },
      select: { nome: true },
    });
    return usuarios.map((usuario) => usuario.nome);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function nomeUnicoParticipante(
  idParticipante: number
): Promise<string> {
  try {
    const usuario = await prisma.usuario.findMany({
      where: { id_user: idParticipante },
      select: { nome: true },
    });
    return usuario[0].nome;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function usuarioDaSessao() {
  //pegar o estado do usuário aqui
  //   return "user";
  //Tres categorias: adm, user, deslogado
  const session = await getServerSession();
  const userEmail = session?.user?.email;
  if (userEmail) {
    const user = await getUserFromDbWithEmail(userEmail);
    if (user) {
      return user;
    }
  }
  return null;
}

export async function cadastrarUsuario(
  nome: string,
  email: string,
  senha: string,
  data_nasc: Date
) {
  const senhaHashed = await saltAndHashPassword(senha);
  const data_criado = new Date();
  try {
    const usuario = await prisma.usuario.create({
      data: {
        nome: nome,
        email: email,
        senha: senhaHashed,
        data_nasc: data_nasc,
        data_criacao: data_criado,
        privilegio: "usuario",
      },
    });
    return usuario;
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log("Email ja cadastrado");
        throw error;
      }
    }
  }
}

export async function todosUsuarios(): Promise<Usuario[]> {
  const vazia: Usuario[] = [];
  try {
    const usuarios = await prisma.usuario.findMany();
    return usuarios;
  } catch (error) {
    console.log(error);
    return vazia;
  }
}

export async function updatePerfilUsuario(data: {
  nome: string;
  senha: string;
}) {
  const senhaHashed = await saltAndHashPassword(data.senha);
  const usuario = await usuarioDaSessao();
  const data_update = new Date();

  await prisma.usuario.update({
    where: { id_user: usuario?.id_user },
    data: {
      nome: data.nome,
      senha: senhaHashed,
      data_atualizacao: data_update,
    },
  });
}

export async function updateUserByID(
  id: number,
  updatedUser: Partial<Usuario>
) {
  try {
    return prisma.usuario.update({
      where: { id_user: id },
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
