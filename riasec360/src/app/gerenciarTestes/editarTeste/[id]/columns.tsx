"use client";

import { ColumnDef } from "@tanstack/react-table";

//definindo o formado dos dados
export type Cartao = {
  id_cartao: number;
  pergunta: string | null;
  tipo: string | null;
  em_uso: boolean | null;
};

export const columns: ColumnDef<Cartao>[] = [
  { accessorKey: "pergunta", header: "Pergunta" },
  { accessorKey: "tipo", header: "Tipo" },
];
