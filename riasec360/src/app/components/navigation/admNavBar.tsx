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

// This function simulates fetching the user's name from a database

export async function AdmNavBar() {
  const userName = await usuarioDaSessao();

  return (
    <Menubar>
      <Link href="/">Profissional360</Link>
      <MenubarMenu>
        <MenubarTrigger>Cartões</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href="/gerenciarCartoes">Gerenciar Cartões</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Testes</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href="/gerenciarTestes">Gerenciar Testes</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/gerenciarTestes/criarTeste">Criar Teste</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/realizarTeste">Realizar Teste</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/resultadosParticipante">Histórico de Testes</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Aplicações</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href="/gerenciarAplicacao/criarAplicacao">
              Criar Aplicação
            </Link>
          </MenubarItem>
          <MenubarItem>
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
        <MenubarContent>
          <MenubarItem>
            <Link href="/usuarios/gerenciar">Gerenciar Usuários</Link>
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
