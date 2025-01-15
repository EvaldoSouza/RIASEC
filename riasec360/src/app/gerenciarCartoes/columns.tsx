"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { Cartao } from "../types/types";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Cartao>[] = [
  { accessorKey: "id_cartao", header: "ID" },
  { accessorKey: "pergunta", header: "Pergunta" },
  { accessorKey: "tipo", header: "Tipo" },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions cartao={row.original} row={row} />,
  },
];
