"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { AplicacaoUsuarioComNome } from "@/app/types/types";
import { format } from "date-fns";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<AplicacaoUsuarioComNome>[] = [
  { accessorKey: "id_usuario", header: "ID Usuario" },
  { accessorKey: "nome_usuario", header: "Nome" },
  {
    accessorKey: "inicio_testagem",
    header: "Horário Inicio",
    cell: ({ row }) => {
      const date = row.getValue<Date | null>("inicio_testagem");
      const formattedDate = date ? format(date, "dd/MM/yyyy HH:mm") : "N/A";
      return <div className="text-left">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "fim_testagem",
    header: "Horário Final",
    cell: ({ row }) => {
      const date = row.getValue<Date | null>("fim_testagem");
      const formattedDate = date ? format(date, "dd/MM/yyyy HH:mm") : "N/A";
      return <div className="text-left">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        id_aplicacao={row.original.id_aplicacao}
        id_usuario={row.original.id_usuario}
      />
    ),
  },
];
