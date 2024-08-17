"use client";

import { format } from "date-fns";
import { Cartao } from "../types/types";
import { buscarCartoesEmTeste } from "@/actions/testesActions";
import Dnd from "./dragDrop";
import { useState } from "react";
import styles from "./listaAplicacoes.module.css"; // Import the CSS module

interface ListaAplicacoesProps {
  aplicacoes: any[]; // Adjust the type to match your data structure
}

export default function ListaAplicacoes({ aplicacoes }: ListaAplicacoesProps) {
  const [selectedApplication, setSelectedApplication] = useState<any | null>(
    null
  );

  const now = new Date();

  // Filter out applications that are past their end time, but include those with no time limits
  const filteredAplicacoes = aplicacoes.filter((aplicacao) => {
    const start = aplicacao.hora_inicial
      ? new Date(aplicacao.hora_inicial)
      : null;
    const end = aplicacao.hora_termino
      ? new Date(aplicacao.hora_termino)
      : null;

    if (!start && !end) {
      // No time limit, include this application
      return true;
    } else if (start && end) {
      // Include if current time is within the time window
      return now >= start && now <= end;
    } else if (start && !end) {
      // Include if start time is before now and no end time
      return now >= start;
    }

    return false;
  });

  const handleApplicationSelect = async (aplicacao: any) => {
    const cartoes: Cartao[] | undefined = await buscarCartoesEmTeste(
      aplicacao.id_teste
    );
    if (cartoes) {
      setSelectedApplication({ aplicacao, cartoes });
    } else {
      alert("Teste sem cartões");
    }
  };

  if (selectedApplication) {
    return (
      <Dnd
        cartoes={selectedApplication.cartoes}
        idAplicacao={selectedApplication.aplicacao.id_aplicacao}
        idTeste={selectedApplication.aplicacao.id_teste}
        idUsuario={selectedApplication.aplicacao.idUsuario}
      />
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Escolha uma aplicação para iniciar</h1>
      <ul className={styles.list}>
        {filteredAplicacoes.map((aplicacao) => (
          <li
            key={aplicacao.id_aplicacao}
            className={styles.listItem}
            onClick={() => handleApplicationSelect(aplicacao)}
          >
            <div className={styles.card}>
              <p className={styles.title}>
                {aplicacao.hora_inicial
                  ? `Teste Agendado para ${format(
                      new Date(aplicacao.hora_inicial),
                      "dd-MM-yyyy HH:mm"
                    )}`
                  : "Teste Sem Limite de Tempo"}
              </p>
              <p className={styles.subtitle}>Clique para iniciar</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
