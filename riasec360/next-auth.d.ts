// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Extends the built-in User type to include your custom fields
   */
  interface User extends DefaultUser {
    id: string;
    privilegio: string;
    // Add any other custom fields you use
  }

  /**
   * Extends the built-in Session type to include your custom fields
   */
  interface Session {
    user: {
      id: string;
      privilegio: string;
      // Add any other custom fields you use
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the built-in JWT type to include your custom fields
   */
  interface JWT {
    id: string;
    privilegio: string;
    // Add any other custom fields you use
  }
}
