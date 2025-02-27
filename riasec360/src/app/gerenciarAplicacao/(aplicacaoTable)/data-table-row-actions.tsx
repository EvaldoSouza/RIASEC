//fazer o dropdown menu como componente
"use client";

import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deletarAplicacao } from "@/actions/aplicacaoActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

//No tutorial da menina lá, ela faz isso com outra interface e extends o negocio com essa interface.
//Não entendi por que ela faz isso, então to passando só na interface principal mesmo
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  id_aplicacao: number;
}

export function DataTableRowActions<TData>({
  id_aplicacao: id,
}: DataTableRowActionsProps<TData>) {
  const [openDeleteDialog, setDeleteDialogOpen] = useState<boolean>(false);
  const [deleteMessage, setDeleteMessage] = useState<string>("");
  const router = useRouter();

  async function handleDelete(idAplicacao: number) {
    try {
      await deletarAplicacao(idAplicacao);
      setDeleteMessage("Aplicação deletada com sucesso.");
    } catch (error) {
      let errorMessage = "Erro ao deletar a aplicação.";
      if (error instanceof Error) errorMessage = error.message;
      setDeleteMessage(errorMessage);
      console.log(error);
    } finally {
      setDeleteDialogOpen(true);
      router.refresh();
    }
  }

  return (
    <Dialog open={openDeleteDialog} onOpenChange={setDeleteDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link
              href={{
                pathname: `/gerenciarAplicacao/${id}`,
              }}
            >
              Participantes
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={{
                pathname: `/gerenciarAplicacao/editarAplicacao/${id}`,
              }}
            >
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              handleDelete(id);
            }}
          >
            Apagar Aplicação
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openDeleteDialog} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deletar Aplicação</DialogTitle>
            <DialogDescription>{deleteMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDeleteDialogOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
//TODO mudar a logica para confirmar se vai deletar uma aplicação na janela, e não só deletar
//É nessa logica do Dialog de Delete que tenho de mexer pra fazer isso!
//Esse tambḿe tá com o mesmo bug do pointer-events?
