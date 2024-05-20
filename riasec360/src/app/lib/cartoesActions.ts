//copiando do chines que fez algo parecido
"use server";
import prisma from "../../db/prisma";
import { Cartao } from "../gerenciarCartoes/columns";
import { unstable_noStore as noStore } from "next/cache";

export async function DeletarCartao(input: number) {
  try {
    const deletar = await prisma.cartao.delete({
      where: { id_cartao: input },
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
  try {
    const cartaoEditado = await prisma.cartao.update({
      where: { id_cartao: params.id },
      data: { pergunta: params.pergunta, tipo: params.tipo },
    });
    return cartaoEditado;
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
}

export async function usoCartao(id: number) {}
