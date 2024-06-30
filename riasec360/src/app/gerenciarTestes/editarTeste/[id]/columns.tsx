"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Cartao } from "@/app/types/types";

export const columns: ColumnDef<Cartao>[] = [
  { accessorKey: "pergunta", header: "Pergunta" },
  { accessorKey: "tipo", header: "Tipo" },
];
