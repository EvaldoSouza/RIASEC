import React from "react";
//import AdminDashboard from "../gerenciar/card";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getAllUsers } from "@/actions/userActions";

const AdminPage: React.FC = async () => {
  const usuarios = await getAllUsers();
  return (
    <div>
      <DataTable columns={columns} data={usuarios} />
    </div>
  );
};

export default AdminPage;
