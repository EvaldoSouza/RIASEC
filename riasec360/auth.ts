import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
});
