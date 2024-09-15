// columns.ts
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Usuario } from "@/app/types/types";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Usuario>[] = [
  {
    header: "ID",
    accessorKey: "id_user",
  },
  {
    header: "Nome",
    accessorKey: "nome",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Data de Nascimento",
    accessorKey: "data_nasc",
    cell: ({ row }) => {
      const date = row.getValue<Date | null>("data_nasc");
      const formattedDate = date ? format(date, "dd/MM/yyyy HH:mm") : "N/A";
      return <div className="text-left">{formattedDate}</div>;
    },
  },
  {
    header: "Data Criação",
    accessorKey: "data_criacao",
    cell: ({ row }) => {
      const date = row.getValue<Date | null>("data_criacao");
      const formattedDate = date ? format(date, "dd/MM/yyyy HH:mm") : "N/A";
      return <div className="text-left">{formattedDate}</div>;
    },
  },
  {
    header: "Privilégio",
    accessorKey: "privilegio",
  },
  {
    id: "actions",
    header: () => <div className="font-bold">Actions</div>,
    cell: ({ row }) => {
      const router = useRouter();
      const userId = row.getValue("id_user");

      return (
        <Button onClick={() => router.push(`/usuarios/gerenciar/${userId}`)}>
          Detalhes
        </Button>
      );
    },
  },
];
