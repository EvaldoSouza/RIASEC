"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { LogOut } from "../forms/logout-button";
import { usuarioDaSessao } from "@/actions/userActions";
import { Button, buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Usuario } from "@/app/types/types";
import { redirect, usePathname } from "next/navigation";
import styles from "./admNavBar.module.css";
// This function simulates fetching the user's name from a database
export function AdmNavBar() {
  const [usuario, setUsuario] = useState<Usuario>();
  const pathname = usePathname();
  const [isActive, setActive] = useState(false);
  //Acho que tá toda hora checando o estado, e renderizando o botão de novo

  useEffect(() => {
    const sessionCheck = async () => {
      const user = await usuarioDaSessao();
      if (user) {
        setUsuario(user);
      } else {
        alert("Usuario Null");
        redirect("/");
      }
    };
    sessionCheck();
  }, []);

  //Fazer o link de botão
  return (
    <Menubar>
      <Link
        className={`link ${pathname === "/" ? styles.active : styles.inactive}`}
        href="/"
      >
        Profissional360
      </Link>
      <MenubarMenu>
        <Link
          className={`link ${
            pathname === "/gerenciarCartoes" ? styles.active : styles.inactive
          }`}
          href="/gerenciarCartoes"
        >
          Cartões
        </Link>
      </MenubarMenu>
      <MenubarMenu>
        <Link
          className={`link ${
            pathname === "/gerenciarTestes" ? styles.active : styles.inactive
          } `}
          href="/gerenciarTestes"
        >
          Testes
        </Link>

        <Link
          className={`link ${
            pathname === "/usuarios/gerenciar" ? styles.active : styles.inactive
          } `}
          href="/usuarios/gerenciar"
        >
          Usuários
        </Link>

        <Link
          className={`link ${
            pathname === "/gerenciarAplicacao" ? styles.active : styles.inactive
          } `}
          href="/gerenciarAplicacao"
        >
          Aplicações
        </Link>
      </MenubarMenu>
      <div
        style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
      >
        <Link
          className={`link ${
            pathname === "/perfil"
              ? "text-white-500 font-semibold"
              : "text-blue-600"
          } `}
          href="/perfil"
        >
          <Button>{usuario?.nome}</Button>
        </Link>

        <LogOut />
      </div>
    </Menubar>
  );
}
