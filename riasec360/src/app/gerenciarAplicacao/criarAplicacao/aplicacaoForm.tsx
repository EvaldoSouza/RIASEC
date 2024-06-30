"use client";
import { columns as columnsUsers } from "./(usersTable)/columns";
import { columns as columnsTeste } from "./(testeTable)/columns";
import { DataTableUsers } from "./(usersTable)/data-table-users";
import DatePickerComponent from "./datepicker";
import { DataTableTestes } from "./(testeTable)/data-table-testes";
import { useState } from "react";

import { Teste, Usuario } from "@/app/types/types";
import { Butterfly_Kids } from "next/font/google";
import { Button } from "@mui/material";

interface DadosAplicacao {
  testes: Teste[];
  usuarios: Usuario[];
}

const AplicacaoForm = ({ testes, usuarios }: DadosAplicacao) => {
  const [dataFromB, setDataFromB] = useState([]);
  const [horairos, setHorarios] = useState<Date[]>();
  const [teste, setTeste] = useState<number>();

  const handleDataFromB = (data: any) => {
    setDataFromB(data);
  };

  const salvarHorarios = (data: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    if (data.startDate && data.endDate) {
      const horariosRecebidos: Date[] = [data.startDate, data.endDate];
      setHorarios(horariosRecebidos);
    }
  };

  const salvarTeste = (data: number) => {
    console.log(data);
    setTeste(data);
  };

  function salvarDados(): void {
    console.log(dataFromB);
    console.log(horairos);
  }

  return (
    <div>
      <h1>Criando Aplicação</h1>
      <DatePickerComponent callBackData={salvarHorarios} />
      <DataTableTestes
        data={testes}
        columns={columnsTeste}
        callbackFunction={salvarTeste}
      />
      <DataTableUsers
        data={usuarios}
        columns={columnsUsers}
        callbackFunction={handleDataFromB}
      />
      <Button onClick={salvarDados}> Salvar</Button>
    </div>
  );
};

export default AplicacaoForm;
