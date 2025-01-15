"use server";
import prisma from "@/db/prisma";
import {
  //nomesParticipantes,
  nomeUnicoParticipante,
  //usuarioDaSessao,
} from "./userActions";
import {
  Aplicacao,
  AplicacaoUsuario,
  AplicacaoUsuarioComNome,
  RespostaCartao,
  RespostasDisplay,
} from "@/app/types/types";
import { Prisma } from "@prisma/client";

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

//retorna o id de todas as aplicações que o usuário já fez ou vai fazer
async function IDaplicacoesDoUsuario(idUsuario: number): Promise<number[]> {
  try {
    const todasAplicacoesDoUsuario: { id_aplicacao: number }[] =
      await prisma.aplicacao_usuario.findMany({
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
    const idAplicacoesUsuario = await IDaplicacoesDoUsuario(idUsuario);
    const aplicacoes: Aplicacao[] = await prisma.aplicacao.findMany({
      where: { id_aplicacao: { in: idAplicacoesUsuario } },
    });

    const aplicacoesFuturas: Aplicacao[] = [];
    for (const aplicacao of aplicacoes) {
      if (aplicacao.hora_inicial) {
        if (aplicacao.hora_inicial > dataAtual) {
          aplicacoesFuturas.push(aplicacao);
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

export async function todasAplicacoesDoUsuario(
  idUsuario: number
): Promise<Aplicacao[]> {
  try {
    const idAplicacoesUsuario = await IDaplicacoesDoUsuario(idUsuario);
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
  dataInicio?: Date | string,
  dataFinal?: Date | string,
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

//TODO testar se tá deletando usuário de aplicação já respondida
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
    // Buscar os detalhes da aplicação
    const aplicacao = await prisma.aplicacao.findUnique({
      where: { id_aplicacao: idAplicacao },
    });

    if (!aplicacao) {
      throw new Error("Aplicação não encontrada.");
    }

    // Verificar se a aplicação já foi respondida
    const respostasExistem = await prisma.aplicacao_usuario.findFirst({
      where: {
        id_aplicacao: idAplicacao,
        inicio_testagem: {
          not: null, // Garante que o teste foi iniciado
        },
      },
    });

    if (respostasExistem) {
      throw new Error(
        "Não é possível deletar uma aplicação que já foi respondida."
      );
    }

    // Verificar se a aplicação já foi iniciada (caso não tenha respostas)
    if (aplicacao.hora_inicial && aplicacao.hora_inicial < new Date()) {
      console.log(
        "Aplicação está no passado, mas não foi respondida. Deletando..."
      );
    } else if (aplicacao.hora_inicial && aplicacao.hora_inicial >= new Date()) {
      throw new Error(
        "Não é possível deletar uma aplicação que já foi iniciada."
      );
    }

    // Prosseguir com a deleção
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
    //const deletando = await deletarAplicacao(idAplicacao);
    await deletarAplicacao(idAplicacao);
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
  respostaAfinidade?: string,
  respostaCompetencia?: string
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

//dado um usuário, retornar todas as aplicações com pelo menos uma resposta.
export async function AplicacoesRespondidasPeloUsuario(
  id_usuario: number
): Promise<Aplicacao[]> {
  try {
    const aplicacoes = await prisma.aplicacao_usuario.findMany({
      where: {
        id_usuario: id_usuario,
        resposta_cartao: {
          some: {}, // This ensures there is at least one related resposta_cartao
        },
      },
      include: {
        aplicacao: true,
        resposta_cartao: true,
      },
    });

    return aplicacoes.map((aplicacaoUsuario) => aplicacaoUsuario.aplicacao);
  } catch (error) {
    console.error("Error retrieving aplicacoes:", error);
    throw error;
  }
}

//Dado usuario e aplicação, retornar as respostas dadas
export async function getRespostasCartao(
  id_aplicacao: number,
  id_usuario: number
): Promise<RespostasDisplay[]> {
  try {
    const respostas = await prisma.resposta_cartao.findMany({
      where: {
        aplicacao_usuarioId_aplicacao: id_aplicacao,
        aplicacao_usuarioId_usuario: id_usuario,
      },
      include: {
        cartao: true,
      },
    });

    // Extract only the desired information
    const formattedRespostas = respostas.map((resposta) => ({
      resposta_competencia: resposta.resposta_competencia,
      resposta_afinidade: resposta.resposta_afinidade,
      id_cartao: resposta.id_cartao,
      pergunta: resposta.cartao.pergunta,
      tipo: resposta.cartao.tipo,
    }));

    return formattedRespostas;
  } catch (error) {
    console.error("Error retrieving respostas:", error);
    throw error;
  }
}

export async function iniciarTestagem(idAplicacao: number, idUsuario: number) {
  try {
    // Atualizar o campo inicio_testagem quando o usuário começa a responder
    const updatedAplicacaoUsuario = await prisma.aplicacao_usuario.update({
      where: {
        id_usuario_id_aplicacao: {
          id_aplicacao: idAplicacao,
          id_usuario: idUsuario,
        },
      },
      data: {
        inicio_testagem: new Date(), // Gravar a hora atual como o início da testagem
      },
    });

    return updatedAplicacaoUsuario;
  } catch (error) {
    console.error("Erro ao iniciar a testagem:", error);
    throw error;
  }
}

// actions/aplicacaoActions.ts
export async function finalizarTestagem(
  idAplicacao: number,
  idUsuario: number
) {
  try {
    const updatedAplicacaoUsuario = await prisma.aplicacao_usuario.update({
      where: {
        id_usuario_id_aplicacao: {
          id_aplicacao: idAplicacao,
          id_usuario: idUsuario,
        },
      },
      data: {
        fim_testagem: new Date(), // Record the current time as the end time
      },
    });

    return updatedAplicacaoUsuario;
  } catch (error) {
    console.error("Erro ao finalizar a testagem:", error);
    throw error;
  }
}

export async function checarAplicacaoFoiRespondida(
  idAplicacao: number,
  idUsuario: number
): Promise<boolean> {
  try {
    const response = await prisma.resposta_cartao.findFirst({
      where: {
        aplicacao_usuarioId_aplicacao: idAplicacao,
        aplicacao_usuarioId_usuario: idUsuario,
      },
    });

    return response !== null; // Se tem uma resposta, a aplicação foi respondida
  } catch (error) {
    console.error("Erro ao checar se a aplicação foi respondida", error);
    throw error;
  }
}

export async function infosAplicacao(idAplicacao: number): Promise<Aplicacao> {
  try {
    const aplicacao = await prisma.aplicacao.findUnique({
      where: { id_aplicacao: idAplicacao },
    });
    if (!aplicacao) {
      console.log("Aplicação não encontrada");
      throw Error;
      //TODO melhorar isso aqui
    }
    return aplicacao;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
