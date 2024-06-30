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
import {
  agendarAplicacao,
  marcarAplicacaoUsuario,
} from "@/actions/aplicacaoActions";

interface DadosAplicacao {
  testes: Teste[];
  usuarios: Usuario[];
}

const AplicacaoForm = ({ testes, usuarios }: DadosAplicacao) => {
  const [horarios, setHorarios] = useState<Date[]>();
  const [teste, setTeste] = useState<number>();
  const [usuariosSelecionados, setUsuarios] = useState<number[]>();

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
    setTeste(data);
  };

  const salvarUsuarios = (data: number[]) => {
    setUsuarios(data);
  };

  async function salvarDados() {
    console.log("Horario: ", horarios);
    console.log("Teste: ", teste);
    console.log("Usuarios: ", usuariosSelecionados);
    const criacao = new Date();

    //por que o teste foi marcado como string?
    if (teste && horarios) {
      const aplicacao = await agendarAplicacao(
        +teste,
        criacao,
        horarios[0],
        horarios[1]
      );

      if (aplicacao) {
        usuariosSelecionados?.map(
          async (usuario) =>
            await marcarAplicacaoUsuario(aplicacao.id_aplicacao, +usuario)
        );
      }

      //TODO fazer uma janelinha ou aviso de que foi marcada as aplicações
    }
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
        callbackFunction={salvarUsuarios}
      />
      <Button onClick={salvarDados}> Salvar</Button>
    </div>
  );
};

export default AplicacaoForm;
