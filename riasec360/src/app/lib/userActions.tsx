"use server";
import { User } from "@prisma/client";
import prisma from "../../db/prisma";
import bcrypt from "bcrypt";
import { signIn } from "../../../auth";
import { AuthError } from "next-auth";

export async function userState() {
  //pegar o estado do usuário aqui
  //   return "user";
  return "adm";
}

export async function getUserFromDb(
  email: string
): Promise<User | null | undefined> {
  try {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    return user;
  } catch (error) {
    console.log("Algo deu errado ao buscar usuário no banco:", error);
    throw error;
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
