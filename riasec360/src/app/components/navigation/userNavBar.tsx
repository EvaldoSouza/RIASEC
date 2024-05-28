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
        <MenubarTrigger>Aplicações</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Agendadas</MenubarItem>
          <MenubarItem>Realizadas</MenubarItem>
          <MenubarItem>Perdidas</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Resultados</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Mais Recente</MenubarItem>
          <MenubarItem>Todos</MenubarItem>
          <MenubarItem>Estatísticas</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Grupos</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Perfil</MenubarTrigger>
      </MenubarMenu>
      <LogOut />
    </Menubar>
  );
}
