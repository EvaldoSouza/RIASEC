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

import { Aplicacao } from "@/app/types/types";
import Link from "next/link";
import { deletarAplicacao } from "@/actions/aplicacaoActions";

async function onDelete(idAplicacao: number) {
  if (idAplicacao > 0) {
    //const deletado = await DeletarCartao(id_cartao);
    const deletado = await deletarAplicacao(+idAplicacao);
    console.log(deletado, idAplicacao);
  } else {
    console.log("ID inválido");
  }
}

export const columns: ColumnDef<Aplicacao>[] = [
  { accessorKey: "id_aplicacao", header: "ID" },
  { accessorKey: "id_teste", header: "ID Teste" },
  { accessorKey: "hora_inicial", header: "Horário Inicio" },
  { accessorKey: "hora_termino", header: "Horário Final" },
  { accessorKey: "data_agendamento", header: "Agendado Em" },
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

              <DropdownMenuItem>
                <Link
                  href={{
                    pathname: `/gerenciarAplicacao/editarAplicacao/${aplicacao.id_aplicacao}`,
                  }}
                >
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={{
                    pathname: `/gerenciarAplicacao/todasAplicacoes/${aplicacao.id_aplicacao}`,
                  }}
                >
                  Participantes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDeleteDialogOpen(true);
                  onDelete(aplicacao.id_aplicacao);
                  router.refresh();
                }}
              >
                Apagar Aplicação
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
