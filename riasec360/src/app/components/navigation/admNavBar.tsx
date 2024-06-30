import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { LogOut } from "../forms/logout-button";

export function AdmNavBar() {
  return (
    <Menubar>
      <Link href="/">Profissional360</Link>
      <MenubarMenu>
        <MenubarTrigger>Cartões</MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link href="/gerenciarCartoes">Gerenciar Cartões</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Testes</MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link href="/gerenciarTestes">Gerenciar Testes</Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link href="/gerenciarTestes/criarTeste">Criar Teste</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Aplicações</MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link href="/gerenciarAplicacao/criarAplicacao">
              Criar Aplicação
            </Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link href="/gerenciarAplicacao/todasAplicacoes">
              Ver Aplicações Agendadas
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Grupos</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Usuários</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Perfil</MenubarTrigger>
      </MenubarMenu>
      <LogOut />
    </Menubar>
  );
}
