"use server";

import { todasAplicacoesDoUsuario } from "@/actions/aplicacaoActions";
import { usuarioDaSessao } from "@/actions/userActions";
import ListaAplicacoes from "./listaAplicacoes";
import { redirect } from "next/navigation";
import { checarAplicacaoFoiRespondida } from "@/actions/aplicacaoActions";

export default async function Page() {
  const usuario = await usuarioDaSessao();

  if (!usuario) {
    redirect("/");
  }

  const aplicacoes = await todasAplicacoesDoUsuario(usuario.id_user);

  if (!aplicacoes.length) {
    return <h1>Sem testes agendados no momento</h1>;
  }

  // Filtrar as aplicações que não foram respondidas e estão dentro do horário permitido
  const aplicacoesNaoRespondidas = [];
  const now = new Date(); // Hora atual

  for (const aplicacao of aplicacoes) {
    const isAnswered = await checarAplicacaoFoiRespondida(
      aplicacao.id_aplicacao,
      usuario.id_user
    );

    // Verificar se a aplicação já foi respondida
    if (isAnswered) {
      continue;
    }

    const start = aplicacao.hora_inicial
      ? new Date(aplicacao.hora_inicial)
      : null;
    const end = aplicacao.hora_termino
      ? new Date(aplicacao.hora_termino)
      : null;

    let isInTimeWindow = false;

    // Verificar se a aplicação está dentro do período de tempo permitido
    if (!start && !end) {
      // Se não houver horário de início nem término, a aplicação está sempre disponível
      isInTimeWindow = true;
    } else if (start && end) {
      // Verificar se a hora atual está entre o horário de início e término
      isInTimeWindow = now >= start && now <= end;
    } else if (start && !end) {
      // Se houver apenas horário de início, verificar se a hora atual é posterior ao início
      isInTimeWindow = now >= start;
    }

    if (isInTimeWindow) {
      aplicacoesNaoRespondidas.push(aplicacao);
    }
  }

  // Se todas as aplicações foram respondidas ou estão fora do horário permitido, exiba uma mensagem informando isso
  if (!aplicacoesNaoRespondidas.length) {
    return (
      <h1>
        Todos os testes foram respondidos ou estão fora do horário permitido
      </h1>
    );
  }

  // Renderize a lista de aplicações não respondidas e dentro do horário permitido
  return <ListaAplicacoes aplicacoes={aplicacoesNaoRespondidas} />;
}
