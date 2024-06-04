// ClientComponent.tsx
"use client";

import React, { useState } from "react";

interface ClientComponentProps {
  questions: string[];
}

const ClientComponent: React.FC<ClientComponentProps> = ({ questions }) => {
  const [responses, setResponses] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const handleResponseChange = (response: string) => {
    const newResponses = [...responses];
    newResponses[currentQuestionIndex] = response;
    setResponses(newResponses);
  };

  const handleNextQuestion = () => {
    if (responses[currentQuestionIndex]) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      alert("Please answer the question before proceeding.");
    }
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (responses.includes("")) {
      alert("Please answer all the questions before submitting.");
    } else {
      console.log("User responses:", responses);
      // Handle form submission
    }
  };

  return (
    <div className="w-2/3 space-y-6">
      <form onSubmit={onSubmit}>
        <div className="space-y-3">
          <label>{questions[currentQuestionIndex]}</label>
          <div className="flex flex-col space-y-1">
            {[
              "Gostaria Muito",
              "Gostaria Parcialmente",
              "Indiferente",
              "Não Gostaria",
              "Detestaria",
            ].map((option) => (
              <div
                key={option}
                className="flex items-center space-x-3 space-y-0"
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={responses[currentQuestionIndex] === option}
                  onChange={() => handleResponseChange(option)}
                />
                <label className="font-normal">{option}</label>
              </div>
            ))}
          </div>
        </div>
        {currentQuestionIndex < questions.length - 1 ? (
          <button type="button" onClick={handleNextQuestion}>
            Prox
          </button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
};

export default ClientComponent;
