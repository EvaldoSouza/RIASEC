//fazer o dropdown menu como componente
"use client";

import { Row } from "@tanstack/react-table";
import { useState } from "react";
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
import EditarCartaoForm from "./dialog-form";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DeletarCartao } from "../../actions/cartoesActions";
import { Cartao } from "../types/types";

//No tutorial da menina lá, ela faz isso com outra interface e extends o negocio com essa interface.
//Não entendi por que ela faz isso, então to passando só na interface principal mesmo
//Gerenciar Cartões dropdown
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  cartao: Cartao;
}

export function DataTableRowActions<TData>({
  cartao,
}: DataTableRowActionsProps<TData>) {
  const [openDeleteDialog, setDeleteDialogOpen] = useState<boolean>(false);
  const [openEditDialog, setEditDialogOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const router = useRouter();

  async function onDelete(id_cartao: number) {
    if (id_cartao > 0) {
      const deletado = await DeletarCartao(id_cartao);
      if (deletado == "Cartão em uso") {
        alert(deletado);
      }
      console.log(deletado);
      setDeleteDialogOpen(true);

      router.refresh();
    } else {
      console.log("ID inválido");
    }
  }

  React.useEffect(() => {
    console.log("openEditDialog state updated:", openEditDialog);
  }, [openEditDialog]);

  async function onClose() {
    setEditDialogOpen(false);

    router.refresh();
  }

  if (cartao.em_uso) {
    return <h3>Em Uso</h3>;
  } else {
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
              <button
                onClick={() => {
                  setOpenDropdown(false);

                  setEditDialogOpen(true);
                }}
                className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
              >
                Editar
              </button>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                onDelete(cartao.id_cartao);
              }}
            >
              Apagar Cartão
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Edit Dialog */}
        <Dialog
          open={openEditDialog}
          onOpenChange={(isOpen) => {
            setEditDialogOpen(isOpen);
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editando Cartão {cartao.id_cartao}</DialogTitle>
            </DialogHeader>
            <EditarCartaoForm
              idRecebido={cartao.id_cartao}
              pergunta={cartao.pergunta || "Escreva uma Pergunta"}
              tipoRecebido={cartao.tipo}
              setIsOpen={onClose}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={openDeleteDialog} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Deletando</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

//TODO mudar a logica para confirmar se vai deletar uma aplicação na janela, e não só deletar
