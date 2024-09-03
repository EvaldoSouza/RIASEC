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

interface CardAplicacaoProps {
  dataInicio: Date | null;
  idUsuario: number;
  nomeUsuario: string;
  idTeste: number;
  idAplicacao: number;
  answers: RespostasDisplay[];
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
  answers,
}) => {
  const [showAnswers, setShowAnswers] = useState(false);

  let dataString = "Sem Data de Inicio";
  if (dataInicio) {
    dataString = formatDateString(dataInicio);
  }

  const abrirRespostas = () => {
    setShowAnswers(!showAnswers);
  };

  return (
    <Card className="aplicacoes-display">
      <CardHeader>Aplicação do dia {dataString}</CardHeader>
      <CardContent>Participante: {nomeUsuario}</CardContent>
      <CardContent>Teste: {idTeste}</CardContent>
      <Button onMouseDown={abrirRespostas}>
        {showAnswers ? "Esconder Respostas" : "Mostrar Respostas"}
      </Button>
      {showAnswers && (
        <CardContent>
          <div className="grid grid-cols-3 gap-5">
            {answers.map((answer, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{answer.pergunta}</CardTitle>
                  <CardDescription>{answer.id_cartao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Tipo da pergunta: {answer.tipo}</p>
                  <p>Resposta de afinidade: {answer.resposta_afinidade}</p>
                  <p>Resposta de competencia: {answer.resposta_competencia}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default CardAplicacao;
