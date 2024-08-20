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

      const [openDeleteDialog, setDeleteDialogOpen] = useState<boolean>(false);
      const [deleteMessage, setDeleteMessage] = useState<string>("");

      // Function to handle deletion
      async function handleDelete(idAplicacao: number) {
        try {
          await deletarAplicacao(idAplicacao);
          setDeleteMessage("Aplicação deletada com sucesso.");
        } catch (error: any) {
          setDeleteMessage(error.message || "Erro ao deletar a aplicação.");
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
                  handleDelete(aplicacao.id_aplicacao);
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
                <Button onClick={() => setDeleteDialogOpen(false)}>
                  Fechar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Dialog>
      );
    },
  },
];
