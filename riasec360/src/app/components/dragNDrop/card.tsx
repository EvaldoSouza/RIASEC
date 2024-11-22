import React from "react";
import styles from "./card.module.css";

interface DraggableCardProps {
  phrase: string;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ phrase }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", phrase);
  };

  return (
    <div draggable onDragStart={handleDragStart} className={styles.card}>
      {phrase}
    </div>
  );
};

export default DraggableCard;
