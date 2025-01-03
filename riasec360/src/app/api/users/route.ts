"use server";
import { NextApiRequest, NextApiResponse } from "next";
import { getUserByID } from "@/actions/userActions";
import bcrypt from "bcryptjs";
import { updateUserByID } from "@/actions/adminActions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  console.log(`Received request for user ID: ${id}`);

  if (req.method === "PUT") {
    try {
      const { currentPassword, newPassword, ...updatedUser } = req.body;

      const existingUser = await getUserByID(Number(id));
      if (!existingUser) {
        console.log(`User with ID ${id} not found.`);
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      // Password validation and update logic
      if (currentPassword && newPassword) {
        const isMatch = await bcrypt.compare(
          currentPassword,
          existingUser.senha
        );
        if (!isMatch) {
          return res.status(400).json({ message: "Senha atual incorreta." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        updatedUser.senha = hashedPassword;
      }

      const result = await updateUserByID(Number(id), updatedUser);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ message: "Falha ao atualizar o usuário." });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} não permitido.` });
  }
}

//TODO fazer uma autenticação direito
