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
    <div className="container">
      <h1>
        Arraste a afirmação para o campo que representa sua preferência e
        competência nela:
      </h1>

      <div className={styles.dragArea}>
        {currentPhraseIndex < cartoes.length ? (
          <DraggableCard phrase={cartoes[currentPhraseIndex].pergunta || ""} />
        ) : (
          <div>Você finalizou o teste!</div>
        )}
      </div>

      <div className={styles.dropZones}>
        <div className={styles.dropZoneRow}>
          <h3 className={styles.label}></h3>
          <h3 className={styles.label}>Adoro usar</h3>
          <h3 className={styles.label}>Gosto muito de usar</h3>
          <h3 className={styles.label}>Gosto de usar</h3>
          <h3 className={styles.label}>Não gosto de usar</h3>
          <h3 className={styles.label}>Detestaria</h3>
        </div>
        <div className={styles.dropZoneRow}>
          <h3 className={styles.label}>Altamente Habilidoso</h3>
          <DropZone
            label="Adoro usar / Altamente Habilidoso"
            onDrop={handleDrop}
          />
          <DropZone
            label="Gosto muito de usar / Altamente Habilidoso"
            onDrop={handleDrop}
          />
          <DropZone
            label="Gosto de usar / Altamente Habilidoso"
            onDrop={handleDrop}
          />
          <DropZone
            label="Não gosto de usar / Altamente Habilidoso"
            onDrop={handleDrop}
          />
          <DropZone
            label="Detestaria / Altamente Habilidoso"
            onDrop={handleDrop}
          />
        </div>
        <div className={styles.dropZoneRow}>
          <h3 className={styles.label}>Habilidade Media </h3>
          <DropZone label="Adoro usar / Habilidade Media" onDrop={handleDrop} />
          <DropZone
            label="Gosto muito de usar / Habilidade Media"
            onDrop={handleDrop}
          />
          <DropZone
            label="Gosto de usar / Habilidade Media"
            onDrop={handleDrop}
          />
          <DropZone
            label="Não gosto de usar / Habilidade Media"
            onDrop={handleDrop}
          />
          <DropZone label="Detestaria / Habilidade Media" onDrop={handleDrop} />
        </div>
        <div className={styles.dropZoneRow}>
          <h3 className={styles.label}>Nada Habilidoso </h3>
          <DropZone label="Adoro usar / Nada Habilidoso " onDrop={handleDrop} />
          <DropZone
            label="Gosto muito de usar / Nada Habilidoso "
            onDrop={handleDrop}
          />
          <DropZone
            label="Gosto de usar / Nada Habilidoso "
            onDrop={handleDrop}
          />
          <DropZone
            label="Não gosto de usar / Nada Habilidoso "
            onDrop={handleDrop}
          />
          <DropZone label="Detestaria / Nada Habilidoso " onDrop={handleDrop} />
        </div>
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
