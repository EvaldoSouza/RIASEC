"use client";

import { Cartao } from "../types/types";
import { z } from "zod";
import DraggableCard from "./../components/dragNDrop/card";
import DropZone from "../components/dragNDrop/zone";
import { useState } from "react";
import { Button } from "@/components/ui/button";

//how the fuck I should do it?
interface dnd {
  cartoes: Cartao[];
  idAplicacao: number;
  idTeste: number;
  idUsuario: number;
}

//this thing is gonna be at the bottom of the page, a series of boxes
const preferencias = [
  "Gostaria Muito",
  "Gostaria Parcialmente",
  "Indiferente",
  "Não Gostaria",
  "Detestaria",
];

const Dnd: React.FC<dnd> = ({ cartoes, idAplicacao, idTeste, idUsuario }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [droppedData, setDroppedData] = useState<
    { phrase: string; label: string }[]
  >([]);

  const handleDrop = (phrase: string, label: string) => {
    setDroppedData((prevData) => [...prevData, { phrase, label }]);
    if (currentPhraseIndex < cartoes.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1);
    } else {
      // All phrases have been dropped
      setCurrentPhraseIndex(cartoes.length); // Set to a value that is out of bounds
    }
  };

  const handleGoBack = () => {
    setDroppedData((prevData) => {
      const newData = [...prevData];
      newData.pop(); // Remove the last entry
      return newData;
    });
    setCurrentPhraseIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleSave = async () => {
    //const teste = await
    console.log(droppedData);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Arraste a pergunta para o campo que representa sua preferência</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {currentPhraseIndex < cartoes.length &&
        cartoes[currentPhraseIndex].pergunta ? (
          <DraggableCard phrase={cartoes[currentPhraseIndex].pergunta} />
        ) : (
          <div>Você finalizou o teste!</div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "40px",
        }}
      >
        <DropZone label="Gostaria Muito" onDrop={handleDrop} />
        <DropZone label="Gostaria Parcialmente" onDrop={handleDrop} />
        <DropZone label="Indiferente" onDrop={handleDrop} />
        <DropZone label="Não Gostaria" onDrop={handleDrop} />
        <DropZone label="Detestaria" onDrop={handleDrop} />
      </div>

      <div
        style={{ display: "flex", justifyContent: "left", marginTop: "20px" }}
      >
        <Button onClick={handleGoBack} disabled={droppedData.length === 0}>
          Voltar
        </Button>
        {currentPhraseIndex == cartoes.length - 1 && (
          <Button onMouseDown={handleSave}>Salvar</Button>
        )}
      </div>

      {}

      {droppedData.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Suas Respostas</h2>
          <ul>
            {droppedData.map((data, index) => (
              <li key={index}>
                <strong>{data.phrase}</strong> - {data.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dnd;
