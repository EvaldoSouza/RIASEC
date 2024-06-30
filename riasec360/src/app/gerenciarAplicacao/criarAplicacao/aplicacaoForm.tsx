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

  const handleDataFromB = (data: any) => {
    setDataFromB(data);
  };

  function salvarDados(): void {
    console.log(dataFromB);
  }

  return (
    <div>
      <h1>Criando Aplicação</h1>
      <DatePickerComponent callBackData={handleDataFromB} />
      <DataTableTestes
        data={testes}
        columns={columnsTeste}
        callbackFunction={handleDataFromB}
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
