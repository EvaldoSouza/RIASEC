"use client";
import React from "react";
import { getAllUsers } from "@/actions/userActions";
import {
  elevateToAdmin,
  updateUserPassword,
  updateUserEmail,
} from "@/actions/adminActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Usuario } from "@/app/types/types";
import styles from "./AdminDashboard.module.css"; // Import CSS module for styling

interface AdminDashboardProps {
  usuarios: Usuario[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ usuarios }) => {
  const handleElevateToAdmin = async (userId: number) => {
    await elevateToAdmin(userId);
    console.log("privilegio");
  };

  const handleUpdatePassword = async (userId: number, newPassword: string) => {
    await updateUserPassword(userId, newPassword);
  };

  const handleUpdateEmail = async (userId: number, newEmail: string) => {
    await updateUserEmail(userId, newEmail);
  };

  return (
    <div>
      <h1>Usuarios Cadastrados</h1>
      <div className={styles.cardContainer}>
        {usuarios.map((user) => (
          <Card key={user.id_user} className={styles.userCard}>
            <CardHeader>
              {user.nome} ({user.email}) - {user.privilegio}
            </CardHeader>
            {user.privilegio !== "administrador" && (
              <CardContent>
                <Button onClick={() => handleElevateToAdmin(user.id_user)}>
                  Promover a Administrador
                </Button>
                <Button
                  onClick={() =>
                    handleUpdatePassword(
                      user.id_user,
                      prompt("New Password:") || ""
                    )
                  }
                >
                  Atualizar Senha
                </Button>
                <Button
                  onClick={() =>
                    handleUpdateEmail(user.id_user, prompt("New Email:") || "")
                  }
                >
                  Atualizar Email
                </Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
