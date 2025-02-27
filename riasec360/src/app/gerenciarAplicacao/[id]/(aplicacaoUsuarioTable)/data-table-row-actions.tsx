//fazer o dropdown menu como componente
"use client";

import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { removerUsuarioDeAplicacao } from "@/actions/aplicacaoActions";
import {
  Dialog,
  DialogContent,
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
  id_usuario: number;
}

export function DataTableRowActions<TData>({
  id_aplicacao,
  id_usuario,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();

  const [openDeleteDialog, setDeleteDialogOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  async function onDelete(idAplicacao: number, idUsuario: number) {
    if (idAplicacao > 0) {
      const deletado = await removerUsuarioDeAplicacao(idAplicacao, idUsuario);
      console.log(deletado);
    } else {
      console.log("ID inválido");
    }
  }
  return (
    <>
      <DropdownMenu
        open={openDropdown}
        onOpenChange={(isOpen) => {
          setOpenDropdown(isOpen);
        }}
      >
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
                pathname: `/gerenciarAplicacao/${id_aplicacao}/${id_usuario}`,
              }}
            >
              Resultados de Testes
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setDeleteDialogOpen(true);
              setOpenDropdown(false);
              onDelete(id_aplicacao, id_usuario);
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
            <DialogTitle>Removendo Usuario da Aplicação</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
//TODO mudar a logica para confirmar se vai deletar uma aplicação na janela, e não só deletar
//Ta dando o mesmo problema do pointer actions
