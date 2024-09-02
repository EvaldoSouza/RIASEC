"use client";

import { useState } from "react";
import { format } from "date-fns";
import styles from "./UserInfoCard.module.css";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserInfoCardProps {
  user: {
    id_user: number;
    nome: string;
    email: string;
    data_nasc: Date | string | null;
    emailVerified: Date | null;
    data_criacao: Date | string;
    data_atualizacao: Date | string | null;
  };
}

const InfosUsuarioCard: React.FC<UserInfoCardProps> = ({ user }) => {
  const [nome, setNome] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [dataNasc, setDataNasc] = useState(
    user.data_nasc ? format(new Date(user.data_nasc), "yyyy-MM-dd") : ""
  );
  const [emailVerified] = useState(user.emailVerified);

  // New states for password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = async () => {
    // Basic validation for password fields
    if (newPassword !== confirmPassword) {
      alert("A nova senha e a confirmação da senha não coincidem.");
      return;
    }

    const updatedUser = {
      id_user: user.id_user,
      nome,
      email,
      data_nasc: new Date(dataNasc),
      emailVerified,
      data_criacao: user.data_criacao,
      data_atualizacao: new Date(),
    };

    try {
      console.log("Dentro do try:", updatedUser);
      const response = await fetch(`/api/users/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updatedUser,
          currentPassword: currentPassword ? currentPassword : undefined,
          newPassword: newPassword ? newPassword : undefined,
        }),
      });

      // Log the response status and body
      console.log(`Response status: ${response.status}`);
      const result = await response.json();
      console.log("Response body:", result);

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      console.log("User updated successfully:", result);
      alert("Informações do usuário atualizadas com sucesso!");
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Erro ao atualizar as informações do usuário.");
    }
  };

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.header}>
        <Avatar className={styles.avatar}>
          <AvatarImage src="" alt={nome} />
          <AvatarFallback>{nome[0]}</AvatarFallback>
        </Avatar>
        <CardTitle className={styles.title}>{nome}</CardTitle>
      </CardHeader>
      <CardContent className={styles.content}>
        <div className={styles.field}>
          <label htmlFor="nome">
            <strong>Nome:</strong>
          </label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">
            <strong>Email:</strong>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="data_nasc">
            <strong>Data de Nascimento:</strong>
          </label>
          <input
            id="data_nasc"
            type="date"
            value={dataNasc}
            onChange={(e) => setDataNasc(e.target.value)}
            className={styles.input}
          />
        </div>
        <p>
          <strong>Email Verificado:</strong> {emailVerified ? "Sim" : "Não"}
        </p>
        <p>
          <strong>Conta Criada:</strong>{" "}
          {format(new Date(user.data_criacao), "dd/MM/yyyy")}
        </p>
        <p>
          <strong>Última Atualização:</strong>{" "}
          {user.data_atualizacao
            ? format(new Date(user.data_atualizacao), "dd/MM/yyyy")
            : "N/A"}
        </p>

        {/* Password Fields */}
        <div className={styles.field}>
          <label htmlFor="currentPassword">
            <strong>Senha Atual:</strong>
          </label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="newPassword">
            <strong>Nova Senha:</strong>
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="confirmPassword">
            <strong>Confirmar Nova Senha:</strong>
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
          />
        </div>
      </CardContent>
      <CardFooter className={styles.footer}>
        <button className={styles["btn-primary"]} onClick={handleSave}>
          Salvar Alterações
        </button>
      </CardFooter>
    </Card>
  );
};

export default InfosUsuarioCard;
