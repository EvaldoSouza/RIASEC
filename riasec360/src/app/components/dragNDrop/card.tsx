import React from "react";

interface DraggableCardProps {
  phrase: string;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ phrase }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", phrase);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        width: "150px",
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",
        marginBottom: "40px",
        cursor: "grab",
        textAlign: "center",
      }}
    >
      {phrase}
    </div>
  );
};

export default DraggableCard;
