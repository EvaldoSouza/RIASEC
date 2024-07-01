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
  deletarECriarAplicacao,
  marcarAplicacaoUsuario,
} from "@/actions/aplicacaoActions";

interface DadosAplicacao {
  testes: Teste[];
  usuarios: Usuario[];
  idAplicacao: number;
}

const AplicacaoForm = ({ testes, usuarios, idAplicacao }: DadosAplicacao) => {
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
      const aplicacao = await deletarECriarAplicacao(
        idAplicacao,
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
      <h2>Novo horário para a Aplicação {idAplicacao}</h2>
      <DatePickerComponent callBackData={salvarHorarios} />
      <h2>Alterar o Teste da Aplicação {idAplicacao}</h2>
      <DataTableTestes
        data={testes}
        columns={columnsTeste}
        callbackFunction={salvarTeste}
      />
      <h2>Mudar quem vai participar da Aplicação {idAplicacao}</h2>
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
