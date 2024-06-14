"use server";
import prisma from "@/db/prisma";
import { usuarioDaSessao } from "./userActions";

//retorna o id do primeiro teste agendado para esse usuário
export async function idProximoTeste() {
  const usuario = await usuarioDaSessao();
  console.log("função idProximoTeste ainda em mock");
  return 1;
}

export async function agendarAplicacao(
  idUsuario: number,
  idTeste: number,
  idGrupo?: number,
  local?: string,
  dataAgendamento?: Date
) {
  try {
    const novaAplicacao = await prisma.aplicacao.create({
      data: {
        id_respondente: idUsuario,
        id_teste: idTeste,
        id_grupo: idGrupo,
        local: local,
        data_agendamento: dataAgendamento,
      },
    });
    if (novaAplicacao) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function gravarResposta(
  idAplicacao: number,
  idCartao: number,
  resposta: string,
  tipoResposta: string
) {
  try {
    const novaResposta = await prisma.resposta_cartao.create({
      data: {
        id_aplicacao: idAplicacao,
        id_cartao: idCartao,
        resposta: resposta,
        tipo_resposta: tipoResposta,
      },
    });

    if (novaResposta) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
