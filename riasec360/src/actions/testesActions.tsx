"use server";
import prisma from "../../src/db/prisma";
import { Teste } from "@/app/types/types";

export async function criarTeste(
  description: string,
  cartaoIds: number[]
): Promise<Teste | null> {
  try {
    // Create the TESTE
    const createdTeste = await prisma.teste.create({
      data: {
        descricao: description,
        quant_cartoes: cartaoIds.length,
        data_criacao: new Date(),
        // Here we create an association with the CARTAO by their IDs
        teste_cartao: {
          createMany: {
            data: cartaoIds.map((id) => ({ id_cartao: id })),
          },
        },
      },
      include: {
        teste_cartao: true, // Include the associated cartao in the result
      },
    });

    for (var cartao of cartaoIds) {
      await prisma.cartao.update({
        where: { id_cartao: cartao },
        data: { em_uso: true },
      });
    }

    return createdTeste;
  } catch (error) {
    console.error("Error creating TESTE:", error);
    throw error;
  }
}

export async function criarTesteComID(
  description: string,
  cartaoIds: number[],
  id: number
) {
  try {
    // Create the TESTE
    const createdTeste = await prisma.teste.create({
      data: {
        id_teste: id,
        descricao: description,
        quant_cartoes: cartaoIds.length,
        data_criacao: new Date(),
        // Here we create an association with the CARTAO by their IDs
        teste_cartao: {
          createMany: {
            data: cartaoIds.map((id) => ({ id_cartao: id })),
          },
        },
      },
      include: {
        teste_cartao: true, // Include the associated cartao in the result
      },
    });

    for (var cartao of cartaoIds) {
      await prisma.cartao.update({
        where: { id_cartao: cartao },
        data: { em_uso: true },
      });
    }

    return createdTeste;
  } catch (error) {
    console.error("Error creating TESTE:", error);
    return error;
  }
}

export async function BuscarTodosTestes(): Promise<Teste[]> {
  const vazia: Teste[] = [];
  try {
    const testes = await prisma.teste.findMany();
    if (testes == null || testes.length === 0) {
      console.log("Sem testes");
      return vazia;
    } else {
      return testes;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function buscarTeste(id: number) {
  try {
    const teste = await prisma.teste.findUnique({
      where: { id_teste: id },
    });
    return teste;
  } catch (error) {
    console.log("Encontrar teste com id: ", id, " deu errado por: ", error);
  }
}

export async function DeletarTeste(id: number) {
  try {
    const deletar = await prisma.teste.delete({
      where: {
        id_teste: id,
      },
    });
    return deletar;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function buscarCartoesEmTeste(id: number) {
  try {
    const cartoes_teste = await prisma.teste_cartao.findMany({
      where: { id_teste: id },
    });
    const cartoes_id: number[] = cartoes_teste.map((item) => item.id_cartao);
    const cartoes = await prisma.cartao.findMany({
      where: { id_cartao: { in: cartoes_id } },
    });
    return cartoes;
  } catch (error) {
    console.log(
      "Encontrar cartões em teste com id: ",
      id,
      " deu errado por: ",
      error
    );
  }
}

export async function deletarTeste_Cartao(id_teste: number, id_cartao: number) {
  try {
    const teste_cartao = await prisma.teste_cartao.delete({
      where: { id_teste_id_cartao: { id_teste, id_cartao } },
    });
    return teste_cartao;
  } catch (error) {
    // Handle errors
    console.log(
      "Erro ao deletar teste_cartao com ids: ",
      id_teste,
      id_cartao,
      " Com o erro",
      error
    );
  }
}

export async function cartoesNaoUsadosEmTeste(id_teste: number) {
  try {
    const usados = await buscarCartoesEmTeste(id_teste);
    const id_usados = usados?.map((id) => id.id_cartao);
    const nao_usados = await prisma.cartao.findMany({
      where: { id_cartao: { notIn: id_usados || [] } },
    });

    return nao_usados;
  } catch (error) {
    console.log(error);
  }
}

export async function adicionarCartoesATeste(
  id_teste: number,
  cartaoIds: number[]
) {
  const foiUsado = await prisma.resposta_cartao.findFirst({
    where: { id_teste: id_teste },
  });

  if (foiUsado) {
    return false;
  }

  try {
    const teste = await prisma.teste.update({
      where: { id_teste: id_teste },
      data: {
        teste_cartao: {
          createMany: {
            data: cartaoIds.map((id) => ({ id_cartao: id })),
          },
        },
        quant_cartoes: { increment: cartaoIds.length },
      },
    });

    for (var cartao of cartaoIds) {
      await prisma.cartao.update({
        where: { id_cartao: cartao },
        data: { em_uso: true },
      });
    }

    return teste;
  } catch (error) {
    console.log(error);
  }
}

export async function deletarListaCartoesEmTeste(
  id_teste: number,
  id_cartoes: number[]
) {
  const foiUsado = await prisma.resposta_cartao.findFirst({
    where: { id_teste: id_teste },
  });

  if (foiUsado) {
    return false;
  }
  try {
    for (let id of id_cartoes) {
      await deletarTeste_Cartao(id_teste, id);
      await prisma.teste.update({
        where: { id_teste: id_teste },
        data: { quant_cartoes: { decrement: 1 } },
      });
    }
    return buscarTeste(id_teste);
  } catch (error) {
    console.log(error);
  }
}

export async function atualizarDescricaoTeste(
  novaDesc: string,
  id_teste: number
) {
  const foiUsado = await prisma.resposta_cartao.findFirst({
    where: { id_teste: id_teste },
  });

  if (foiUsado) {
    return false;
  }

  try {
    const novoTeste = await prisma.teste.update({
      where: { id_teste: id_teste },
      data: { descricao: novaDesc },
    });
    console.log("Atualizando descrição com sucesso: ", novoTeste);
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//retorna verdadeiro se foi usado, falso se não foi
export async function testeUsado(id_teste: number) {
  try {
    const foiUsado = await prisma.resposta_cartao.findFirst({
      where: { id_teste: id_teste },
    });

    if (foiUsado) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
