"use client";

//Note: Columns are where you define the core of what your table will look like.
//They define the data that will be displayed, how it will be formatted, sorted and filtered.

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Aplicacao } from "@/app/types/types";
import { format } from "date-fns";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Aplicacao>[] = [
  { accessorKey: "id_aplicacao", header: "ID" },
  { accessorKey: "id_teste", header: "ID Teste" },
  {
    accessorKey: "hora_inicial",
    header: "Horário Inicio",
    cell: ({ row }) => {
      const date = row.getValue<Date | null>("hora_inicial");
      const formattedDate = date ? format(date, "dd/MM/yyyy HH:mm") : "N/A";
      return <div className="text-left">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "hora_termino",
    header: "Horário Final",
    cell: ({ row }) => {
      const date = row.getValue<Date | null>("hora_termino");
      const formattedDate = date ? format(date, "dd/MM/yyyy HH:mm") : "N/A";
      return <div className="text-left">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "data_agendamento",
    header: "Agendado Em",
    cell: ({ row }) => {
      const date = row.getValue<Date | null>("data_agendamento");
      const formattedDate = date ? format(date, "dd/MM/yyyy HH:mm") : "N/A";
      return <div className="text-left">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} id={row.original.id_aplicacao} />
    ),
  },
];
//Aqui só pode ter descrição de dado, e onClick, coisa de interface, não pode ter hooks!
