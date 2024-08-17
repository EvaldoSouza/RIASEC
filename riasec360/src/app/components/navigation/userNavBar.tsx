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

export async function UserNavBar() {
  const userName = await usuarioDaSessao();

  return (
    <Menubar>
      <Link href="/">Profissional360</Link>
      <MenubarMenu>
        <MenubarTrigger>Realizar Teste</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href="/realizarTeste">Realizar Teste</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Grupos</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Meus Grupos</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Perfil</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Testes Agendados</MenubarItem>
          <MenubarItem>
            <Link href="/resultadosParticipante">Histórico de Testes</Link>
          </MenubarItem>
          <MenubarItem>Minhas Estatísticas</MenubarItem>
          <MenubarItem>
            <Link href="/perfil">Editar Perfil</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <div
        style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
      >
        <MenubarMenu>
          <MenubarTrigger>{userName?.nome}</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link href="/perfil">Editar Perfil</Link>
            </MenubarItem>
            <MenubarItem>
              <LogOut />
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </div>
    </Menubar>
  );
}
