import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { LogOut } from "../forms/logout-button";

export function UserNavBar() {
  return (
    <Menubar>
      <Link href="/">Profissional360</Link>
      <MenubarMenu>
        <MenubarTrigger> Realizar Teste</MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
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
          <MenubarItem asChild>
            <Link href="/resultadosParticipante">Histórico de Testes</Link>
          </MenubarItem>
          <MenubarItem>Minhas Estatísticas</MenubarItem>
          <MenubarItem asChild>
            <Link href="/perfil">Editar Perfil</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <LogOut />
    </Menubar>
  );
}
