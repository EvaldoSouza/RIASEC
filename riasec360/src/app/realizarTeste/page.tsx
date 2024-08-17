"use server";

import { todasAplicacoesDoUsuario } from "@/actions/aplicacaoActions";
import { usuarioDaSessao } from "@/actions/userActions";
import ListaAplicacoes from "./listaAplicacoes";
import { redirect } from "next/navigation";

export default async function Page() {
  const usuario = await usuarioDaSessao();

  if (!usuario) {
    redirect("/");
  }

  const aplicacoes = await todasAplicacoesDoUsuario(usuario.id_user);

  if (!aplicacoes.length) {
    return <h1>Sem testes agendados no momento</h1>;
  }

  return <ListaAplicacoes aplicacoes={aplicacoes} />;
}
