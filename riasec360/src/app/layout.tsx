import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { getServerSession } from "next-auth";
import { NotLogedNavBar } from "./components/navigation/notLogedNavBar";
import { AdmNavBar } from "./components/navigation/admNavBar";
import { UserNavBar } from "./components/navigation/userNavBar";
import { privilegioUsuario } from "@/actions/userActions";
import React from "react";
import SessionWrapper from "./components/authentication/SessionWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Profissional360",
  description: "Aplicativo para aplicação de testes RIASEC",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  let privilegio = "";
  if (session) {
    try {
      privilegio = await privilegioUsuario();
    } catch (error) {
      console.error("Failed to fetch user privileges:", error);
    }
  } else {
    console.log("Sem usuario");
  }

  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <main>
                <div className="navigationBar">
                  {!session && (
                    <div>
                      <NotLogedNavBar />
                    </div>
                  )}
                  {session && privilegio === "administrador" && (
                    <div>
                      <AdmNavBar />
                    </div>
                  )}
                  {session && privilegio === "usuario" && (
                    <div>
                      <UserNavBar />
                    </div>
                  )}
                </div>
                {children}
              </main>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
