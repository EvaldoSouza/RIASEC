import React from "react";

interface DropZoneProps {
  label: string;
  onDrop: (phrase: string, label: string) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ label, onDrop }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const phrase = e.dataTransfer.getData("text/plain");
    onDrop(phrase, label);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        width: "150px",
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px dashed black",
        margin: "10px",
        textAlign: "center",
      }}
    >
      {label}
    </div>
  );
};

export default DropZone;
