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
  //const user = userState();
  const session = await getServerSession();
  let privilegio = ""; //TODO existe a possibilidade disso não ser mudado, ou de o usuário ser null, tratar essa parada
  if (session) {
    privilegio = await privilegioUsuario();
  }
  return (
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
                {privilegio === "administrador" && (
                  <div>
                    <AdmNavBar />
                  </div>
                )}
                {privilegio === "usuario" && (
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
  );
}
