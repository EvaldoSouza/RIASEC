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
  RespostaCartao,
} from "@/app/types/types";

//retorna o id do primeiro teste agendado para esse usuário
export async function idProximoTeste(idUsuario: number): Promise<number> {
  try {
    const aplicacoesMarcadas = await aplicacoesAFazerDoUsuario(idUsuario);
    //Esse array está ordenado, ou não? Vamos descobrir
    if (aplicacoesMarcadas && aplicacoesMarcadas[0]) {
      console.log("Achou um teste:", aplicacoesMarcadas[0].id_teste);
      return aplicacoesMarcadas[0].id_teste;
    }
    return -1; //Se der alguma coisa errada, vai retornar um valor incorreto.
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function aplicacoesDoUsuario(idUsuario: number): Promise<number[]> {
  try {
    const todasAplicacoesDoUsuario = await prisma.aplicacao_usuario.findMany({
      where: { id_usuario: idUsuario },
    });
    return todasAplicacoesDoUsuario.map((aplicacao) => aplicacao.id_aplicacao);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function aplicacoesAFazerDoUsuario(
  idUsuario: number
): Promise<Aplicacao[]> {
  try {
    const dataAtual = new Date();
    const idAplicacoesUsuario = await aplicacoesDoUsuario(idUsuario);
    const aplicacoes: Aplicacao[] = await prisma.aplicacao.findMany({
      where: { id_aplicacao: { in: idAplicacoesUsuario } },
    });

    let aplicacoesFuturas: Aplicacao[] = [];
    for (let aplicacao of aplicacoes) {
      if (aplicacao.hora_inicial) {
        if (aplicacao.hora_inicial > dataAtual) {
          aplicacoesFuturas.push(aplicacao);
          //TODO consertar o bug que eu acho que tem aqui. Se a aplicação já tiver começado (caso possível), não vai aparecer, pq é menor que a data atual
        }
      }
    }

    console.log(aplicacoesFuturas);
    return aplicacoesFuturas;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function todasAplicacoesDoUsuario(idUsuario: number) {
  try {
    const idAplicacoesUsuario = await aplicacoesDoUsuario(idUsuario);
    const aplicacoes: Aplicacao[] = await prisma.aplicacao.findMany({
      where: { id_aplicacao: { in: idAplicacoesUsuario } },
    });

    return aplicacoes;
  } catch (error) {
    console.log(error);
    throw error;
  }
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

export async function deletarECriarAplicacao(
  idAplicacao: number,
  idTeste: number,
  dataCriacao: Date | string,
  dataInicio: Date | string,
  dataFinal: Date | string,
  idGrupo?: number,
  local?: string
): Promise<Aplicacao> {
  try {
    const deletando = await deletarAplicacao(idAplicacao);
    const aplicacaoEditada = await prisma.aplicacao.create({
      data: {
        id_aplicacao: idAplicacao,
        id_teste: idTeste,
        id_grupo: idGrupo,
        local: local,
        data_agendamento: dataCriacao,
        hora_inicial: dataInicio,
        hora_termino: dataFinal,
      },
    });

    return aplicacaoEditada;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function gravarResposta(
  idTeste: number,
  idCartao: number,
  idUsuario: number,
  idAplicacao: number,
  respostaCompetencia?: string,
  respostaAfinidade?: string
): Promise<RespostaCartao> {
  try {
    const novaResposta = await prisma.resposta_cartao.create({
      data: {
        id_teste: idTeste,
        id_cartao: idCartao,
        aplicacao_usuarioId_usuario: idUsuario,
        aplicacao_usuarioId_aplicacao: idAplicacao,
        resposta_competencia: respostaCompetencia,
        resposta_afinidade: respostaAfinidade,
      },
    });

    return novaResposta;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function aplicacaoUsuarioEspecifica(
  idAplicacao: number,
  idUsuario: number
): Promise<AplicacaoUsuario> {
  try {
    const aplicacaoUsuario = await prisma.aplicacao_usuario.findFirst({
      where: { id_aplicacao: idAplicacao, id_usuario: idUsuario },
    });

    if (!aplicacaoUsuario) {
      throw "Usuario não tem aplicação marcada";
    }

    return aplicacaoUsuario;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function umaAplicacao() {
  try {
    const aplicacao = await prisma.aplicacao.findFirst();
    if (!aplicacao) throw "Erro na aplicação";
    return aplicacao;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
