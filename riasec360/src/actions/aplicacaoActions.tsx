"use server";
import prisma from "@/db/prisma";
import {
  nomesParticipantes,
  nomeUnicoParticipante,
  usuarioDaSessao,
} from "./userActions";
import {
  Aplicacao,
  AplicacaoUsuario,
  AplicacaoUsuarioComNome,
} from "@/app/types/types";

//retorna o id do primeiro teste agendado para esse usuário
export async function idProximoTeste(): Promise<number> {
  const usuario = await usuarioDaSessao();
  console.log("função idProximoTeste ainda em mock");
  return 1;
}

export async function agendarAplicacao(
  idTeste: number,
  dataCriacao: Date | string,
  dataInicio: Date | string,
  dataFinal: Date | string,
  idGrupo?: number,
  local?: string
): Promise<Aplicacao> {
  try {
    const novaAplicacao = await prisma.aplicacao.create({
      data: {
        id_teste: idTeste,
        id_grupo: idGrupo,
        local: local,
        data_agendamento: dataCriacao,
        hora_inicial: dataInicio,
        hora_termino: dataFinal,
      },
    });

    return novaAplicacao;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function marcarAplicacaoUsuario(
  idAplicacao: number,
  idUsuario: number
): Promise<AplicacaoUsuario> {
  try {
    const novaAplicacaoUsuario = await prisma.aplicacao_usuario.create({
      data: { id_aplicacao: idAplicacao, id_usuario: idUsuario },
    });

    return novaAplicacaoUsuario;
  } catch (error) {
    console.log("Erro ao marcar aplicação para usuario. ", error);
    throw error;
  }
}

export async function retornaTodasAplicacoes(): Promise<Aplicacao[]> {
  try {
    const todasAplicacoes = await prisma.aplicacao.findMany();

    return todasAplicacoes;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function retornaParticipantesDeAplicacao(
  idAplicacao: number
): Promise<AplicacaoUsuario[]> {
  try {
    const participantes = await prisma.aplicacao_usuario.findMany({
      where: { id_aplicacao: idAplicacao },
    });
    return participantes;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function retornaParticipantesComNome(
  idAplicacao: number
): Promise<AplicacaoUsuarioComNome[]> {
  try {
    const participantes = await prisma.aplicacao_usuario.findMany({
      where: { id_aplicacao: idAplicacao },
    });
    const participantesCompletos = await participantes.map((participante) =>
      semNomeParaComNome(participante)
    );
    return Promise.all(participantesCompletos);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function semNomeParaComNome(
  aplicacaoUsuario: AplicacaoUsuario
): Promise<AplicacaoUsuarioComNome> {
  try {
    const nome_usuario = await nomeUnicoParticipante(
      aplicacaoUsuario.id_usuario
    );
    return {
      ...aplicacaoUsuario,
      nome_usuario,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function removerUsuarioDeAplicacao(
  idAplicacao: number,
  idUsuario: number
): Promise<AplicacaoUsuario> {
  try {
    const aplicacaoUsuario = await prisma.aplicacao_usuario.delete({
      where: {
        id_usuario_id_aplicacao: {
          id_aplicacao: idAplicacao,
          id_usuario: idUsuario,
        },
      },
    });
    return aplicacaoUsuario;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deletarAplicacao(
  idAplicacao: number
): Promise<Aplicacao> {
  try {
    const aplicacaoDeletada = await prisma.aplicacao.delete({
      where: { id_aplicacao: idAplicacao },
    });
    return aplicacaoDeletada;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
