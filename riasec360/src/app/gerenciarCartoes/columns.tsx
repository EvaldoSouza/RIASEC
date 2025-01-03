"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  //DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeletarCartao } from "../../actions/cartoesActions";
//import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  //DialogTrigger,
} from "@/components/ui/dialog";

// import { useState } from "react";

// import { ProfileForm } from "./criarCartao/criarCartaoForm";
import DialogForm from "./dialog-form";
import { Cartao } from "../types/types";

async function onDelete(id_cartao: number) {
  if (id_cartao > 0) {
    const deletado = await DeletarCartao(id_cartao);
    if (deletado == "Cartão em uso") {
      alert(deletado);
    }
    console.log(deletado);
  } else {
    console.log("ID inválido");
  }
}

async function onClose() {
  console.log("É pra fechar a caixa de dialogo");
}

export const columns: ColumnDef<Cartao>[] = [
  { accessorKey: "id_cartao", header: "ID" },
  { accessorKey: "pergunta", header: "Pergunta" },
  { accessorKey: "tipo", header: "Tipo" },
  {
    id: "actions",
    cell: ({ row }) => {
      const cartao = row.original;
      // const router = useRouter();

      // const [openEditDialog, setEditDialogOpen] = useState<boolean>(false);
      // const [openDeleteDialog, setDeleteDialogOpen] = useState<boolean>(false);

      if (cartao.em_uso) {
        return <h3>Em Uso</h3>;
      } else {
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
                    //setEditDialogOpen(true);
                    console.log(
                      "Devia abrir um dialogo aqui, mas fiz erradoe to consertando"
                    );
                  }}
                >
                  Editar
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    const id =
                      cartao.id_cartao !== null ? cartao.id_cartao : -1;
                    //setDeleteDialogOpen(true);
                    onDelete(id);
                    //router.refresh();
                  }}
                >
                  Apagar Cartão
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editando Cartão {cartao.id_cartao}</DialogTitle>
              </DialogHeader>
              <DialogForm
                idRecebido={cartao.id_cartao}
                pergunta={cartao.pergunta || "Escreva uma Pergunta"}
                tipoRecebido={cartao.tipo}
                onSubmitClosing={onClose}
              />
            </DialogContent>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Deletando</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      }
    },
  },
];
