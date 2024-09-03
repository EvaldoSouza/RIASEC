"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RespostasDisplay } from "@/app/types/types";
import { Car } from "lucide-react";
import { useRouter } from "next/navigation";

interface CardAplicacaoProps {
  dataInicio: Date | null;
  idUsuario: number;
  nomeUsuario: string;
  idTeste: number;
  idAplicacao: number;
}

function formatDateString(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} as ${hours}:${minutes}`;
}

const CardAplicacao: React.FC<CardAplicacaoProps> = ({
  dataInicio,
  idUsuario,
  nomeUsuario,
  idTeste,
  idAplicacao,
}) => {
  const [showAnswers, setShowAnswers] = useState(false);

  let dataString = "Sem Data de Inicio";
  if (dataInicio) {
    dataString = formatDateString(dataInicio);
  }

  const router = useRouter();
  const abrirRespostas = () => {
    router.push(`${idUsuario}/${idAplicacao}`);
  };

  return (
    <Card className="aplicacoes-display">
      <CardHeader>Aplicação do dia {dataString}</CardHeader>
      <CardContent>Participante: {nomeUsuario}</CardContent>
      <CardContent>Teste: {idTeste}</CardContent>
      <Button onMouseDown={abrirRespostas}>Mostrar Respostas</Button>
    </Card>
  );
};

export default CardAplicacao;
