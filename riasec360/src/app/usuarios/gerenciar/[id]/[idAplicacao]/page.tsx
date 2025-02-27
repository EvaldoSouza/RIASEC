// app/gerenciar/[userId]/[appId]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRespostasCartao } from "@/actions/aplicacaoActions"; // Import your function
import { RespostasDisplay } from "@/app/types/types";
import styles from "./PaginaResultados.module.css";

const ResultsPage = ({
  params,
}: {
  params: { id: string; idAplicacao: string };
}) => {
  const [answers, setAnswers] = useState<RespostasDisplay[]>([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const data = await getRespostasCartao(+params.idAplicacao, +params.id);
        setAnswers(data);
      } catch (error) {
        console.error("Failed to fetch answers:", error);
      }
    };

    fetchAnswers();
  }, [params.idAplicacao, params.id]);

  //Vamos quebrar esse problema em vários
  //Primeiro, o que eu quero fazer: Uma matriz 3x5, onde fica as frases, de acordo com a resposta delas, igual na hora de responder
  //se pa ele é 4x6, pois tem as nomeclaturas tmb! e é isso que estou errando?
  //Ok, como vou fazer isso?
  //Preciso de algo para organizar as frases na matriz, de acordo com a resposta, talvez mudar o BD para isso
  //E algo para mostrar a matriz, a renderização da matriz
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        Resultados para a aplicação {params.idAplicacao}
      </h1>
      <div className={styles.grid}>
        {answers.map((answer, index) => (
          <Card key={index} className={styles.card}>
            <CardHeader>
              <CardTitle>{answer.pergunta}</CardTitle>
              <CardDescription>{answer.id_cartao}</CardDescription>
            </CardHeader>
            <CardContent className={styles.cardContent}>
              <p>
                <span className={styles.hardcodedText}>Tipo da pergunta:</span>
                <span className={styles.variableText}>{answer.tipo}</span>
              </p>
              <p>
                <span className={styles.hardcodedText}>
                  Resposta de afinidade:
                </span>
                <span className={styles.variableText}>
                  {answer.resposta_afinidade}
                </span>
              </p>
              <p>
                <span className={styles.hardcodedText}>
                  Resposta de competência:
                </span>
                <span className={styles.variableText}>
                  {answer.resposta_competencia}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div></div>
    </div>
  );
};

export default ResultsPage;
