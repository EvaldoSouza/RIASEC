import { todosUsuarios, usuarioDaSessao } from "@/actions/userActions";
import AplicacaoForm from "./aplicacaoForm";
import { BuscarTodosTestes } from "@/actions/testesActions";
import { redirect } from "next/navigation";
import React from "react";

export default async function CriarAplicacao() {
  const usuario = await usuarioDaSessao();

  if (!usuario) {
    redirect("/");
  }
  const usuarios = await todosUsuarios();
  const testes = await BuscarTodosTestes();
  return (
    <div>
      <AplicacaoForm testes={testes} usuarios={usuarios} />
    </div>
  );
}
