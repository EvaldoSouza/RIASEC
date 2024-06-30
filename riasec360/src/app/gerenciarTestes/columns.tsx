"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { DeletarTeste } from "../../actions/testesActions";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import Link from "next/link";

//definindo o formado dos dados
import { Teste } from "../types/types";

async function onDelete(id_teste: number) {
  if (id_teste > 0) {
    const deletado = await DeletarTeste(id_teste);
    console.log(deletado);
  } else {
    console.log("ID inválido");
  }
}

export const columns: ColumnDef<Teste>[] = [
  { accessorKey: "id_teste", header: "ID" },
  { accessorKey: "descricao", header: "Descrição" },
  { accessorKey: "quant_cartoes", header: "Quant Cartões" },
  { accessorKey: "data_criacao", header: "Criado Em" },
  {
    id: "actions",
    cell: ({ row }) => {
      const teste = row.original;
      const router = useRouter();

      const [openEditDialog, setEditDialogOpen] = useState<boolean>(false);
      const [openDeleteDialog, setDeleteDialogOpen] = useState<boolean>(false);
      //fazer as ações aqui!
      //não precisa daquela dor de cabeça do popup!
      //e mesmo que for fazer o popup, abrir aqui
      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href={{
                    pathname: `/gerenciarTestes/editarTeste/${teste.id_teste}`,
                  }}
                >
                  Editar Descrição
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={{
                    pathname: `/gerenciarTestes/adicionarCartoes/${teste.id_teste}`,
                  }}
                >
                  Adicionar Cartões
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={{
                    pathname: `/gerenciarTestes/removerCartoes/${teste.id_teste}`,
                  }}
                >
                  Remover Cartões
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator></DropdownMenuSeparator>
              <DropdownMenuItem
                className="text-red-600 hover:!text-red-600 hover:!bg-red-100"
                onClick={() => {
                  const id = teste.id_teste !== null ? teste.id_teste : -1;
                  setDeleteDialogOpen(true);
                  onDelete(id);
                  router.refresh();
                }}
              >
                Apagar Teste
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={openEditDialog} onOpenChange={setEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editando Teste {teste.id_teste}</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog open={openDeleteDialog} onOpenChange={setDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Deletando</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </Dialog>
      );
    },
  },
];

//PAra editar: O que está me atrapalhando mais é como fazer a interface. Queria atualizar direto na tabela, mas se pá alert é mais simples
//O resto é preencher o elemento com os dados da linha, e depois enviar os novos dados para uma função de update do banco
