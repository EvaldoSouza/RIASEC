import { getUserFromDb } from "@/actions/userActions";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        //logica de autorização
        if (!credentials) {
          return null;
        }

        try {
          const user = await getUserFromDb(credentials.email);
          if (user) {
            const senhaCorreta = await compare(
              credentials.password,
              user?.senha
            );
            if (senhaCorreta) {
              console.log("Senha correta:", senhaCorreta);
              return {
                id: user.id_user,
                email: user.email,
                dataNasc: user.data_nasc,
                privilegio: user.privilegio,
                cadastrado: user.data_criacao,
              };
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
