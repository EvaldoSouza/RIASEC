import React from "react";
//import AdminDashboard from "../gerenciar/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getAllUsers } from "@/actions/userActions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AdminPage: React.FC = async () => {
  const usuarios = await getAllUsers();
  return (
    <div>
      <h1 className="fontSize-1.5rem , marginBottom-10px">Lista de Usuários</h1>
      <DataTable columns={columns} data={usuarios} />
      <div>
        <Button>
          <Link href={`/usuarios/gerenciar/criarUsuario`}>Criar Usuario</Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminPage;
