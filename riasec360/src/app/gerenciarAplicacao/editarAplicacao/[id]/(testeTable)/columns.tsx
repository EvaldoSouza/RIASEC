"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Teste } from "@/app/types/types";
import React from "react";

//TODO Dar um jeito de selecionar apenas um teste. Provavelmente vou usar um RadioGroup, mas tá meio bugado na minha cabeça
export const columns: ColumnDef<Teste>[] = [
  {
    id: "select",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected() ? true : false} // Ensure it's a boolean
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "id_teste", header: "ID" },
  { accessorKey: "descricao", header: "Descrição" },
  { accessorKey: "quant_cartoes", header: "Quant Cartões" },
  { accessorKey: "data_criacao", header: "Criado Em" },
];
