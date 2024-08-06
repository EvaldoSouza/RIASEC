"use client";

import React, { useEffect, useState } from "react";
import { getAllUsers } from "@/actions/userActions";
import {
  elevateToAdmin,
  updateUserPassword,
  updateUserEmail,
} from "@/actions/adminActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Usuario } from "@/app/types/types";

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
      <h1>Admin Dashboard</h1>
      <ul>
        {usuarios.map((user) => (
          <li key={user.id_user}>
            <Card className="user-card">
              <CardHeader>
                {user.nome} ({user.email}) - {user.privilegio}
              </CardHeader>
              {user.privilegio !== "administrador" && (
                <CardContent>
                  <Button onClick={() => handleElevateToAdmin(user.id_user)}>
                    Elevate to Admin
                  </Button>
                  <Button
                    onClick={() =>
                      handleUpdatePassword(
                        user.id_user,
                        prompt("New Password:") || ""
                      )
                    }
                  >
                    Update Password
                  </Button>
                  <Button
                    onClick={() =>
                      handleUpdateEmail(
                        user.id_user,
                        prompt("New Email:") || ""
                      )
                    }
                  >
                    Update Email
                  </Button>
                </CardContent>
              )}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
