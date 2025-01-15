"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Teste } from "../types/types";
import { format } from "date-fns";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Teste>[] = [
  { accessorKey: "id_teste", header: "ID" },
  { accessorKey: "descricao", header: "Descrição" },
  {
    accessorKey: "quant_cartoes",
    header: "Quant Cartões",
  },
  {
    accessorKey: "data_criacao",
    header: "Criado Em",
    cell: ({ row }) => {
      const date = row.getValue<Date | null>("data_criacao");
      const formattedDate = date ? format(date, "dd/MM/yyyy HH:mm") : "N/A";
      return <div className="text-left">{formattedDate}</div>;
    },
  },
  {
    id: "actions",

    cell: ({ row }) => (
      <DataTableRowActions row={row} id_teste={row.original.id_teste} />
    ),
  },
];
//TODO fazer o dropdown como componente
