import React, { useEffect, useState } from "react";
import styles from "./zone.module.css";

interface DropZoneProps {
  label: string;
  displayText: string; // Prop passed from parent component
  index: number;
  onDrop: (phrase: string, label: string, index: number) => void;
}

const DropZone: React.FC<DropZoneProps> = ({
  label,
  displayText,
  index,
  onDrop,
}) => {
  const [style, changeStyle] = useState(styles.zone);
  const [textDisplay, changeText] = useState("");

  // Sync the local state `textDisplay` with the `displayText` prop
  //Por que que funcionou:
  useEffect(() => {
    changeText(displayText); // Ensure that `textDisplay` is updated when `displayText` prop changes
  }, [displayText]); //precisa disso daqui para que, quando a matriz mudar, na hora de remover o cartao, mude o texto tambem

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const phrase = e.dataTransfer.getData("text/plain"); //ESsa linha pega a frase que está no cartao
    onDrop(phrase, label, index); //e passa a frase para essa funcao. Eh essa funcao que preenche a matriz.
    changeStyle(styles.zone);
    changeText(phrase); // Estava funcionando para acrescentar, por que passava um texto novo
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleOnDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    changeStyle(styles.zoneDragOver);
  };

  const handleOnDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    changeStyle(styles.zone);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleOnDragEnter}
      onDragLeave={handleOnDragLeave}
      className={style}
    >
      {textDisplay}
    </div>
  );
};

export default DropZone;
