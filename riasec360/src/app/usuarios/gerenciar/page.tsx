import React from "react";
import AdminDashboard from "../gerenciar/card";
import { getAllUsers } from "@/actions/userActions";

const AdminPage: React.FC = async () => {
  const usuarios = await getAllUsers();
  return (
    <div>
      <AdminDashboard usuarios={usuarios} />
    </div>
  );
};

export default AdminPage;
