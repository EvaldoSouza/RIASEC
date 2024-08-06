"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usuarioDaSessao, updatePerfilUsuario } from "@/actions/userActions";

interface UserProfile {
  id_user: number;
  nome: string;
  email: string;
  emailVerified: Date | null;
  data_nasc: Date;
  senha: string;
  data_criacao: Date;
  data_atualizacao: Date | null;
}

const UserProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profile = await usuarioDaSessao();
        if (profile) {
          setUserProfile(profile);
          setNome(profile.nome);
          setLoading(false);
        } else {
          throw "Usuario nulo!";
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    }

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await updatePerfilUsuario({ nome, senha });
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  function formatDateString(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} as ${hours}:${minutes}`;
  }

  return (
    <Card className="user-profile">
      <CardHeader>Perfil do Usuario {userProfile?.nome}</CardHeader>
      {userProfile && (
        <CardContent>
          <p>
            <strong>ID:</strong> {userProfile.id_user}
          </p>
          <p>
            <strong>Email:</strong> {userProfile.email}
          </p>
          <p>
            <strong>Email Verified:</strong>{" "}
            {userProfile.emailVerified
              ? userProfile.emailVerified.toString()
              : "Not Verified"}
          </p>
          <p>
            <strong>Data de Nascimento:</strong>{" "}
            {formatDateString(userProfile.data_nasc)}
          </p>
          <p>
            <strong>Conta Criada:</strong>{" "}
            {formatDateString(userProfile.data_criacao)}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {userProfile.data_atualizacao
              ? formatDateString(userProfile.data_atualizacao)
              : "N/A"}
          </p>
          <div>
            <label>
              Name:
              <Input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <Input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </label>
          </div>
          <Button onMouseDown={handleUpdate}>Update Profile</Button>
        </CardContent>
      )}
    </Card>
  );
};

export default UserProfilePage;
