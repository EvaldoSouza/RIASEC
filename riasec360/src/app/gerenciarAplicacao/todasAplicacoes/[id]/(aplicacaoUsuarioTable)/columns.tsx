"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { AplicacaoUsuarioComNome } from "@/app/types/types";
import Link from "next/link";
import { removerUsuarioDeAplicacao } from "@/actions/aplicacaoActions";

async function onDelete(idAplicacao: number, idUsuario: number) {
  if (idAplicacao > 0) {
    //const deletado = await DeletarCartao(id_cartao);
    const deletado = await removerUsuarioDeAplicacao(idAplicacao, idUsuario);
    console.log(deletado);
  } else {
    console.log("ID inválido");
  }
}

export const columns: ColumnDef<AplicacaoUsuarioComNome>[] = [
  { accessorKey: "id_usuario", header: "ID Usuario" },
  { accessorKey: "nome_usuario", header: "Nome" },
  { accessorKey: "inicio_testagem", header: "Horário Inicio" },
  { accessorKey: "fim_testagem", header: "Horário Final" },
  {
    id: "actions",
    cell: ({ row }) => {
      const aplicacao = row.original;
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
                <span className="sr-only">Abrir Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => {
                  setEditDialogOpen(true);
                }}
              >
                Editar
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  setDeleteDialogOpen(true);
                  onDelete(aplicacao.id_aplicacao, aplicacao.id_usuario);
                  router.refresh();
                }}
              >
                Remover Usuario
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
