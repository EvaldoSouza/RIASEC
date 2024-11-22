import React, { useEffect, useState } from "react";
import styles from "./zone.module.css";

interface DropZoneProps {
  label: string;
  //prevText: string;
  onDrop: (phrase: string, label: string) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ label, onDrop }) => {
  const [style, changeStyle] = useState(styles.zone);
  const [textDisplay, changeText] = useState("");
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const phrase = e.dataTransfer.getData("text/plain");
    onDrop(phrase, label);
    changeStyle(styles.zone);
    changeText(phrase);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleOnDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("Entrando");
    changeStyle(styles.zoneDragOver);
  };

  const handleOnDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("saindo");
    changeStyle(styles.zone);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleOnDragEnter}
      onDragLeave={handleOnDragLeave}
      className={style}
    ></div>
  );
};

export default DropZone;
