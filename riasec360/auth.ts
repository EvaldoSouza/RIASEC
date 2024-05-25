import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUserFromDb } from "@/actions/userActions";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
//import { PrismaClient } from "@prisma/client";
import prisma from "./src/db/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          try {
            const user = await getUserFromDb(email);
            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.senha);
            if (passwordsMatch) return user;
          } catch (error) {
            console.log(error);
            throw new CredentialsSignin();
          }
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
