"use client";

import { format } from "date-fns";
import { Aplicacao, Cartao } from "../types/types";
import { buscarCartoesEmTeste } from "@/actions/testesActions";
import { iniciarTestagem } from "@/actions/aplicacaoActions"; // Import the iniciarTestagem function
import Dnd from "./dragDrop";
import { useState } from "react";
import styles from "./listaAplicacoes.module.css"; // Import the CSS module
import { usuarioDaSessao } from "@/actions/userActions";

interface ListaAplicacoesProps {
  aplicacoes: Aplicacao[]; // Adjust the type to match your data structure
}

interface SelectedApplication {
  aplicacao: Aplicacao;
  cartoes: Cartao[];
}

export default function ListaAplicacoes({ aplicacoes }: ListaAplicacoesProps) {
  const [selectedApplication, setSelectedApplication] =
    useState<SelectedApplication | null>(null);
  const [usuarioId, setUsuarioId] = useState<number>(-1);

  const handleApplicationSelect = async (aplicacao: Aplicacao) => {
    // Começa o teste salvando a data e hora de inicio
    try {
      const usuario = await usuarioDaSessao();
      if (!usuario) {
        throw "Erro com o usuário!/n Usuário inválido";
      }
      setUsuarioId(usuario.id_user);
      await iniciarTestagem(aplicacao.id_aplicacao, usuario?.id_user);
    } catch (error) {
      console.error("Erro ao iniciar a aplicação:", error);
      alert("Erro ao iniciar a aplicação. Tente novamente.");
      return;
    }

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
        idUsuario={usuarioId}
      />
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Escolha uma aplicação para iniciar</h1>
      <ul className={styles.list}>
        {aplicacoes.map((aplicacao) => (
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
