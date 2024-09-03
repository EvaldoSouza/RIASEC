"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  RowSelectionState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import {
  adicionarCartoesATeste,
  criarTesteComID,
  deletarListaCartoesEmTeste,
  DeletarTeste,
  deletarTeste_Cartao,
} from "../../../../actions/testesActions";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  id_teste: number;
}

const FormSchema = z.object({
  descricao: z.string().max(600, {
    message: "Descrição muito longa!",
  }),
});

export function DataTable<TData, TValue>({
  columns,
  data,
  id_teste,
}: DataTableProps<TData, TValue>) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id_cartao,
    state: {
      columnFilters,
      rowSelection,
    },
  });

  const router = useRouter();

  async function onSubmit() {
    const cartoes = Object.keys(rowSelection);
    const ids = cartoes.map((numero) => +numero);
    const testeEditado = await deletarListaCartoesEmTeste(+id_teste, ids);
    if (testeEditado) {
      router.refresh();
      router.push(`/gerenciarTestes`);
    } else {
      alert(
        "Teste já foi respondido por alguém, e portanto não pode ser modificado!"
      );
    }
  }

  // useEffect(() => {
  //   const id_cartoes_usados = data_used.map((item) => item.id_cartao);
  //   const cartoes_usados = id_cartoes_usados.reduce((acc, id) => {
  //     acc[id.toString()] = true;
  //     return acc;
  //   }, {} as Record<string, boolean>);

  //   setRowSelection(cartoes_usados);
  // }, [data_used]);

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar Perguntas..."
          value={
            (table.getColumn("pergunta")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("pergunta")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      <Button onClick={onSubmit}>Remover Cartões</Button>
    </div>
  );
}
