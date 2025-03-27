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
import styles from "./navBar.module.css";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Usuario } from "@/app/types/types";
import { Button } from "@/components/ui/button";
import React from "react";
export function UserNavBar() {
  const [usuario, setUsuario] = useState<Usuario>();
  const pathname = usePathname();
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

  return (
    <Menubar>
      <Link
        className={`link ${pathname === "/" ? styles.active : styles.inactive}`}
        href="/"
      >
        Profissional360
      </Link>

      <Link
        className={`link ${
          pathname === "/realizarTeste" ? styles.active : styles.inactive
        }`}
        href="/realizarTeste"
      >
        Aplicação
      </Link>
      <Link
        className={`link ${
          pathname === "/resultadosParticipante"
            ? styles.active
            : styles.inactive
        }`}
        href="/resultadosParticipante"
      >
        Histórico de Aplicações
      </Link>

      <div
        style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
      >
        <MenubarMenu>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link
              className={`link ${
                pathname === "/perfil"
                  ? "text-white-500 font-semibold"
                  : "text-blue-600"
              } `}
              href={`/usuarios/gerenciar/${usuario?.id_user}`}
            >
              <Button>{usuario?.nome}</Button>
            </Link>

            <LogOut />
          </div>
        </MenubarMenu>
      </div>
    </Menubar>
  );
}
