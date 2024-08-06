"use server";
import {
  aplicacoesAFazerDoUsuario,
  todasAplicacoesDoUsuario,
} from "@/actions/aplicacaoActions";
import { buscarCartoesEmTeste } from "@/actions/testesActions";
import Likert from "./likert";
import { Cartao } from "../types/types";
import { usuarioDaSessao } from "@/actions/userActions";
import Dnd from "./dragDrop";
import { redirect } from "next/navigation";
import { format } from "date-fns";

export default async function realizarTeste() {
  const usuario = await usuarioDaSessao();

  if (!usuario) {
    redirect("/");
    return <h1>Algum problema com o usuario</h1>;
  }

  const aplicacoes = await todasAplicacoesDoUsuario(usuario.id_user);

  if (!aplicacoes[0]) {
    return <h1>Sem testes agendados no momento</h1>;
  }

  const now = new Date();
  const currentApplication = aplicacoes.find((aplicacao) => {
    const start = aplicacao.hora_inicial
      ? new Date(aplicacao.hora_inicial)
      : null;
    const end = aplicacao.hora_termino
      ? new Date(aplicacao.hora_termino)
      : null;
    if (start && end) {
      return now >= start && now <= end;
    }
    return false;
  });

  if (!currentApplication) {
    const nextApplication = aplicacoes.find((aplicacao) => {
      const start = aplicacao.hora_inicial
        ? new Date(aplicacao.hora_inicial)
        : null;
      return start && start > now;
    });

    if (nextApplication) {
      const start = nextApplication.hora_inicial
        ? new Date(nextApplication.hora_inicial)
        : null;
      return (
        <div>
          <h1>Próximo teste agendado</h1>
          <p>
            Data de início:{" "}
            {start ? format(start, "dd-MM-yyyy HH:mm") : "Data inválida"}
          </p>
        </div>
      );
    } else {
      return <h1>Sem testes agendados no momento</h1>;
    }
  }

  const cartoes: Cartao[] | undefined = await buscarCartoesEmTeste(
    currentApplication.id_teste
  );

  if (cartoes) {
    return (
      <Dnd
        cartoes={cartoes}
        idAplicacao={currentApplication.id_aplicacao}
        idTeste={currentApplication.id_teste}
        idUsuario={usuario.id_user}
      />
    );
  } else {
    return <h1>Teste sem cartões</h1>;
  }
}
