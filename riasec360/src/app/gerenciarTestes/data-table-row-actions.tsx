//fazer o dropdown menu como componente
"use client";

import { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  //DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DeletarTeste, testeUsado } from "@/actions/testesActions";
import Link from "next/link";

//No tutorial da menina lá, ela faz isso com outra interface e extends o negocio com essa interface.
//Não entendi por que ela faz isso, então to passando só na interface principal mesmo
//Gerenciar Cartões dropdown
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  id_teste: number;
}

async function usado(teste: number): Promise<boolean> {
  if (teste > 0) {
    const usado = await testeUsado(teste);
    return usado;
  } else {
    console.log("ID inválido");
    return false;
  }
}

async function onDelete(id_teste: number) {
  if (id_teste > 0) {
    const deletado = await DeletarTeste(id_teste);
    console.log(deletado);
  } else {
    console.log("ID inválido");
  }
}

export function DataTableRowActions<TData>({
  id_teste,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();

  const [openEditDialog, setEditDialogOpen] = useState<boolean>(false);
  const [openDeleteDialog, setDeleteDialogOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  //const testeJaRespondido = usado(teste.id_teste).then();
  const [testeJaRespondido, setTesteJaRespondido] = useState(false);

  useEffect(() => {
    const checkIfUsed = async () => {
      const result = await usado(id_teste);
      setTesteJaRespondido(result);
    };

    checkIfUsed();
  }, [id_teste]);

  return testeJaRespondido ? (
    <Dialog>
      <DialogTitle className="font-12">Aplicado</DialogTitle>
    </Dialog>
  ) : (
    <Dialog>
      <DropdownMenu
        open={openDropdown}
        onOpenChange={(isOpen) => {
          setOpenDropdown(isOpen);
        }}
      >
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
                pathname: `/gerenciarTestes/editarTeste/${id_teste}`,
              }}
            >
              Editar Descrição
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={{
                pathname: `/gerenciarTestes/adicionarCartoes/${id_teste}`,
              }}
            >
              Adicionar Cartões
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={{
                pathname: `/gerenciarTestes/removerCartoes/${id_teste}`,
              }}
            >
              Remover Cartões
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem
            className="text-red-600 hover:!text-red-600 hover:!bg-red-100"
            onClick={() => {
              const id = id_teste !== null ? id_teste : -1;
              setOpenDropdown(false);
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
            <DialogTitle>Editando Teste {id_teste}</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={openDeleteDialog} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deletando Teste</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}

//TODO mudar a logica para confirmar se vai deletar uma aplicação na janela, e não só deletar
