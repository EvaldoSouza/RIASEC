"use client";

import { Cartao } from "../types/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import DraggableCard from "./../components/dragNDrop/card";
import DropZone from "../components/dragNDrop/zone";
import styles from "./dragDrop.module.css";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { finalizarTestagem, gravarResposta } from "@/actions/aplicacaoActions";
import React from "react";

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
  const router = useRouter(); // Initialize the router

  //Codigo da pilha de cartões
  //uma matriz com 15 posições, uma para cada zona, cada posição pode receber 0 ou mais strings

  const [perguntasRespondidasArrays, setPerguntasRespondidasArrays] =
    React.useState<string[][]>([
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
    ]);

  const [ordemDosCartoes, setOrdemDosCartoes] = React.useState<number[]>([]);
  //agora, preciso de uma forma de sempre pegar a ultima posição do array, para passar pra zona. Estou considerando que não vou andar pelo array de respostas,
  //quando a pessoa voltar, é como se não tivesse respondido a pergunta
  //vou usar o array.at(-1)
  //se voltar do array.pop no ultimo
  //como vou definir qual zona recebe qual posição do array? Por enquanto, hardcode
  //de alguma forma preciso que o handleDrop salve a phrase também na matriz
  const handleDrop = (phrase: string, label: string, index: number) => {
    setDroppedData((prevData) => [...prevData, { phrase, label }]);

    perguntasRespondidasArrays[index].push(phrase); //atualizando aqui a matriz de frases...falam pra não usar push, mas ta funcionando nao vou mecher
    setOrdemDosCartoes((ordemDosCartoes) => [...ordemDosCartoes, index]);

    if (currentPhraseIndex < cartoes.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1);
    } else {
      setCurrentPhraseIndex(cartoes.length);
    }
  };

  //agora, preciso que o handleGoBack tambem tire a frase da matriz de perguntas
  //se eu tenho um array, que salva a ordem que coloquei os cartões, e eu ficar dando pop nele quando voltar...
  const handleGoBack = () => {
    // Update droppedData immutably
    setDroppedData((prevData) => {
      const newData = [...prevData];
      newData.pop();
      return newData;
    });

    // Update currentPhraseIndex
    setCurrentPhraseIndex((prevIndex) => {
      return prevIndex > 0 ? prevIndex - 1 : 0;
    });

    // Update ordemDosCartoes immutably
    setOrdemDosCartoes((prevOrdem) => {
      const newOrdem = [...prevOrdem];
      newOrdem.pop();
      return newOrdem;
    });

    // Get the last element of ordemDosCartoes
    const ultima = ordemDosCartoes.at(-1);

    // Update perguntasRespondidasArrays immutably
    setPerguntasRespondidasArrays((prevArrays) =>
      prevArrays.map(
        (innerArray, index) =>
          index === ultima ? innerArray.slice(0, -1) : innerArray // Only modify the target inner array
      )
    );

    //console.log(perguntasRespondidasArrays);
  };

  const handleSave = async () => {
    try {
      for (let index = 0; index < cartoes.length; index++) {
        const cartao = cartoes[index];

        const respostaJunto = droppedData[index]?.label;
        const respostaDupla = respostaJunto.split(" / ");

        // Primeiro set de respostas
        const respostaAfinidade = respostaDupla[0];

        // Segundo set de respostas, do final do array de cartões até o fim das respostas
        const respostaCompetencia = respostaDupla[1];

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

  //console.log("Matrix desgraçada: ", perguntasRespondidasArrays);

  return (
    <div className="container">
      <h1>
        Arraste a habilidade para o campo que representa sua preferência e
        competência nela:
      </h1>

      <div className={styles.dragArea}>
        {currentPhraseIndex < cartoes.length ? (
          <DraggableCard phrase={cartoes[currentPhraseIndex].pergunta || ""} />
        ) : (
          <div>Você finalizou o teste!</div>
        )}
      </div>

      <div>
        Cartões: {currentPhraseIndex} / {cartoes.length}
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
            displayText={perguntasRespondidasArrays[0].at(-1)}
            index={0}
          />
          <DropZone
            label="Gosto muito de usar / Altamente Habilidoso"
            onDrop={handleDrop}
            displayText={perguntasRespondidasArrays[1].at(-1)}
            index={1}
          />
          <DropZone
            label="Gosto de usar / Altamente Habilidoso"
            onDrop={handleDrop}
            displayText={perguntasRespondidasArrays[2].at(-1)}
            index={2}
          />
          <DropZone
            label="Não gosto de usar / Altamente Habilidoso"
            onDrop={handleDrop}
            displayText={perguntasRespondidasArrays[3].at(-1)}
            index={3}
          />
          <DropZone
            label="Detestaria / Altamente Habilidoso"
            onDrop={handleDrop}
            displayText={perguntasRespondidasArrays[4].at(-1)}
            index={4}
          />
        </div>
        <div className={styles.dropZoneRow}>
          <h3 className={styles.label}>Habilidade Media </h3>
          <DropZone
            label="Adoro usar / Habilidade Media"
            onDrop={handleDrop}
            displayText={perguntasRespondidasArrays[5].at(-1)}
            index={5}
          />
          <DropZone
            label="Gosto muito de usar / Habilidade Media"
            onDrop={handleDrop}
            displayText={perguntasRespondidasArrays[6].at(-1)}
            index={6}
          />
          <DropZone
            label="Gosto de usar / Habilidade Media"
            onDrop={handleDrop}
            displayText={perguntasRespondidasArrays[7].at(-1)}
            index={7}
          />
          <DropZone
            label="Não gosto de usar / Habilidade Media"
            onDrop={handleDrop}
            displayText={perguntasRespondidasArrays[8].at(-1)}
            index={8}
          />
          <DropZone
            label="Detestaria / Habilidade Media"
            onDrop={handleDrop}
            displayText={perguntasRespondidasArrays[9].at(-1)}
            index={9}
          />
        </div>
        <div className={styles.dropZoneRow}>
          <h3 className={styles.label}>Nada Habilidoso </h3>
          <DropZone
            label="Adoro usar / Nada Habilidoso "
            onDrop={handleDrop}
            displayText={perguntasRespondidasArrays[10].at(-1)}
            index={10}
          />
          <DropZone
            label="Gosto muito de usar / Nada Habilidoso "
            onDrop={handleDrop}
            displayText={perguntasRespondidasArrays[11].at(-1)}
            index={11}
          />
          <DropZone
            label="Gosto de usar / Nada Habilidoso "
            onDrop={handleDrop}
            displayText={perguntasRespondidasArrays[12].at(-1)}
            index={12}
          />
          <DropZone
            label="Não gosto de usar / Nada Habilidoso "
            onDrop={handleDrop}
            displayText={perguntasRespondidasArrays[13].at(-1)}
            index={13}
          />
          <DropZone
            label="Detestaria / Nada Habilidoso "
            onDrop={handleDrop}
            displayText={perguntasRespondidasArrays[14].at(-1)}
            index={14}
          />
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

      {/* {droppedData.length > 0 && (
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
      )} */}
    </div>
  );
};

export default Dnd;
