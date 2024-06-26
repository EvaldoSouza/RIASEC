"use server";
//import prisma from "../../db/prisma";
//import { signIn } from "../../../auth";
import AuthError from "next-auth";
import { saltAndHashPassword } from "@/lib/passwords";
import { Prisma, usuario } from "@prisma/client";
import prisma from "@/db/prisma";
import { getServerSession } from "next-auth";
import { promises } from "dns";
import { Usuario } from "@/app/types/types";

export async function privilegioUsuario() {
  //pegar o estado do usuário aqui
  //   return "user";
  //Tres categorias: adm, user, deslogado
  const session = await getServerSession();
  const userEmail = session?.user?.email;
  if (userEmail) {
    const user = await getUserFromDb(userEmail);
    if (user) {
      return user.privilegio;
    }
  }
  return "deslogado";
}

export async function getUserFromDb(email: string): Promise<usuario> {
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
    const user = await getUserFromDb(userEmail);
    if (user) {
      return user;
    }
  }
  return null;
}

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData
// ) {
//   try {
//     const user = await signIn("credentials", formData);
//     return user;
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return "Invalid credentials.";
//         default:
//           return "Something went wrong.";
//       }
//     }
//     throw error;
//   }
// }

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
