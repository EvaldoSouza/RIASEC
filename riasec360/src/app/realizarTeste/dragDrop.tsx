"use client";

import { Cartao } from "../types/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import DraggableCard from "./../components/dragNDrop/card";
import DropZone from "../components/dragNDrop/zone";
import styles from "./dragDrop.module.css";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { finalizarTestagem, gravarResposta } from "@/actions/aplicacaoActions";

interface DndProps {
  cartoes: Cartao[];
  idAplicacao: number;
  idTeste: number;
  idUsuario: number;
}

const Dnd: React.FC<DndProps> = ({
  cartoes,
  idAplicacao,
  idTeste,
  idUsuario,
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [droppedData, setDroppedData] = useState<
    { phrase: string; label: string }[]
  >([]);
  const [interesseAptitude, setInteresseAptitude] = useState(0);
  const router = useRouter(); // Initialize the router

  const handleDrop = (phrase: string, label: string) => {
    setDroppedData((prevData) => [...prevData, { phrase, label }]);
    if (currentPhraseIndex < cartoes.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1);
    } else {
      if (interesseAptitude === 0) {
        setInteresseAptitude(1);
        setCurrentPhraseIndex(0);
      } else {
        setCurrentPhraseIndex(cartoes.length);
      }
    }
  };

  const handleGoBack = () => {
    setDroppedData((prevData) => {
      const newData = [...prevData];
      newData.pop();
      return newData;
    });
    setCurrentPhraseIndex((prevIndex) => {
      if (prevIndex === 0 && interesseAptitude !== 0) {
        setInteresseAptitude(0);
        return cartoes.length - 1;
      }
      return prevIndex > 0 ? prevIndex - 1 : 0;
    });
  };

  const handleSave = async () => {
    try {
      for (let index = 0; index < cartoes.length; index++) {
        const cartao = cartoes[index];

        // Primeiro set de respostas
        const respostaAfinidade = droppedData[index]?.label;

        // Segundo set de respostas, do final do array de cartões até o fim das respostas
        const respostaCompetencia = droppedData[index + cartoes.length]?.label;

        console.log(cartao.pergunta, respostaAfinidade, respostaCompetencia);

        await gravarResposta(
          idTeste,
          cartao.id_cartao,
          idUsuario,
          idAplicacao,
          respostaAfinidade,
          respostaCompetencia
        );
      }

      // Save the end time of the test
      await finalizarTestagem(idAplicacao, idUsuario);

      alert("Teste Salvo com Sucesso!");
      router.push("/"); // Replace with your target path
    } catch (error) {
      console.error("Erro ao salvar o teste:", error);
      alert("Erro ao salvar o teste. Por favor, tente novamente.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        {interesseAptitude === 0
          ? "Arraste a pergunta para o campo que representa sua preferência"
          : "Arraste a pergunta para o campo que representa sua competência"}
      </h1>

      <div className={styles.dragArea}>
        {currentPhraseIndex < cartoes.length ? (
          <DraggableCard phrase={cartoes[currentPhraseIndex].pergunta || ""} />
        ) : (
          <div>Você finalizou o teste!</div>
        )}
      </div>

      <div className={styles.dropZones}>
        {interesseAptitude === 0 ? (
          <div className={styles.dropZoneRow}>
            <DropZone label="Gostaria Muito" onDrop={handleDrop} />
            <DropZone label="Gostaria Parcialmente" onDrop={handleDrop} />
            <DropZone label="Indiferente" onDrop={handleDrop} />
            <DropZone label="Não Gostaria" onDrop={handleDrop} />
            <DropZone label="Detestaria" onDrop={handleDrop} />
          </div>
        ) : (
          <div className={styles.dropZoneRow}>
            <DropZone label="Sou Competente" onDrop={handleDrop} />
            <DropZone label="Parcialmente Competente" onDrop={handleDrop} />
            <DropZone label="Passável" onDrop={handleDrop} />
            <DropZone label="Parcialmente Incompetente" onDrop={handleDrop} />
            <DropZone label="Totalmente Incompetente" onDrop={handleDrop} />
          </div>
        )}
      </div>

      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "left" }}
      >
        <Button onClick={handleGoBack} disabled={droppedData.length === 0}>
          Voltar
        </Button>
        {currentPhraseIndex === cartoes.length && (
          <Button onClick={handleSave}>Salvar</Button>
        )}
      </div>

      {droppedData.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Suas Respostas</h2>
          <div className={styles.answerColumns}>
            {Array.from({ length: 2 }).map((_, setIndex) => (
              <div className={styles.column} key={setIndex}>
                <ul>
                  {droppedData
                    .slice(
                      setIndex * cartoes.length,
                      (setIndex + 1) * cartoes.length
                    )
                    .map((data, index) => (
                      <li key={index}>
                        <strong>{data.phrase}</strong> - {data.label}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dnd;
