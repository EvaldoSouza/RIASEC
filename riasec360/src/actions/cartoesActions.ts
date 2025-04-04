//copiando do chines que fez algo parecido
"use server";
import prisma from "@/db/prisma";
import { unstable_noStore as noStore } from "next/cache";
import { Cartao } from "@/app/types/types";

export async function DeletarCartao(idCartao: number) {
  const em_uso = await prisma.resposta_cartao.findFirst({
    where: { id_cartao: idCartao },
  });
  if (em_uso) {
    console.log("Cartão em uso");
    return "Cartão em uso";
  }
  try {
    const deletar = await prisma.cartao.delete({
      where: { id_cartao: idCartao },
    });
    return deletar;
  } catch (err) {
    return {
      data: null,
      error: err,
    };
  }
}

export async function BuscarTodosCartoes(): Promise<Cartao[]> {
  noStore();
  const cartoes = await prisma.cartao.findMany();
  if (cartoes == null || cartoes.length === 0) {
    return [];
  }
  return cartoes;
}

export async function CriarCartao(params: { pergunta: string; tipo: string }) {
  try {
    const cartao = await prisma.cartao.create({
      data: {
        pergunta: params.pergunta,
        tipo: params.tipo,
      },
    });

    return cartao;
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
}

export async function EditarCartao(params: {
  id: number;
  pergunta: string;
  tipo: string;
}) {
  const em_uso = await prisma.resposta_cartao.findFirst({
    where: { id_cartao: params.id },
  });
  if (em_uso) {
    console.log("Cartão em uso");
    return "Cartão em uso";
  }
  try {
    const cartaoEditado = await prisma.cartao.update({
      where: { id_cartao: params.id },
      data: { pergunta: params.pergunta, tipo: params.tipo },
    });
    return cartaoEditado;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//essa função pode demorar um cado
export async function updateCartoesUso() {
  try {
    //achar todos os cartões, uma lista completa
    //verificar se cada cartão está associado a um cartao_resposta, pois só bloqueia se foi respondido
    //se estiver, dar um update no status de usado
    const cartoes = await prisma.cartao.findMany();

    for (const cartao of cartoes) {
      const usado = await prisma.resposta_cartao.findFirst({
        where: { id_cartao: cartao.id_cartao },
      });
      if (usado?.id_resposta) {
        await prisma.cartao.update({
          where: { id_cartao: cartao.id_cartao },
          data: { em_uso: true },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
