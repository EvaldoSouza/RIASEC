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
import { Button } from "@/components/ui/button";

// This function simulates fetching the user's name from a database

export async function AdmNavBar() {
  const userName = await usuarioDaSessao();

  return (
    <Menubar>
      <Link href="/">Profissional360</Link>
      <MenubarMenu>
        <Button>
          <Link href="/gerenciarCartoes">Cartões</Link>
        </Button>
      </MenubarMenu>
      <MenubarMenu>
        <Button>
          <Link href="/gerenciarTestes">Testes</Link>
        </Button>
        <Button>
          <Link href="/usuarios/gerenciar">Usuários</Link>
        </Button>
        <Button>
          <Link href="/realizarTeste">Aplicações</Link>
        </Button>
      </MenubarMenu>
      <div
        style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
      >
        <Link href="/perfil">
          <Button>{userName?.nome}</Button>
        </Link>

        <LogOut />
      </div>
    </Menubar>
  );
}
