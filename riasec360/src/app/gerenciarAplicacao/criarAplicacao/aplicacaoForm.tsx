"use client";
import { columns as columnsUsers } from "./(usersTable)/columns";
import { columns as columnsTeste } from "./(testeTable)/columns";
import { DataTableUsers } from "./(usersTable)/data-table-users";
import DatePickerComponent from "@/actions/datepicker";
import { DataTableTestes } from "./(testeTable)/data-table-testes";
import { useState } from "react";
import { Teste, Usuario } from "@/app/types/types";
import { Button } from "@/components/ui/button";
import {
  agendarAplicacao,
  marcarAplicacaoUsuario,
} from "@/actions/aplicacaoActions";
import React from "react";
import { useRouter } from "next/navigation";

interface DadosAplicacao {
  testes: Teste[];
  usuarios: Usuario[];
}

const AplicacaoForm = ({ testes, usuarios }: DadosAplicacao) => {
  const [horarios, setHorarios] = useState<Date[]>();
  const [teste, setTeste] = useState<number>();
  const [usuariosSelecionados, setUsuarios] = useState<number[]>();
  const [semLimiteDeTempo, setSemLimiteDeTempo] = useState<boolean>(false);
  const router = useRouter();

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

  const handleCheckboxChange = () => {
    setSemLimiteDeTempo(!semLimiteDeTempo);
    if (!semLimiteDeTempo) {
      setHorarios(undefined); // Clear the date picker if checkbox is selected
    }
  };

  async function salvarDados() {
    const criacao = new Date();

    try {
      let aplicacao;
      if (semLimiteDeTempo) {
        aplicacao = await agendarAplicacao(+teste!, criacao);
      } else if (horarios) {
        aplicacao = await agendarAplicacao(
          +teste!,
          criacao,
          horarios[0],
          horarios[1]
        );
      }

      if (aplicacao) {
        usuariosSelecionados?.map(
          async (usuario) =>
            await marcarAplicacaoUsuario(aplicacao.id_aplicacao, +usuario)
        );
        //TODO vou ter que fazer uma janela de alerta customizada?
        alert(`Aplicação agendada com sucesso!\n
          ID da Aplicação: ${aplicacao.id_aplicacao}\n
          Teste: ${teste}\n
          ${
            semLimiteDeTempo
              ? "Sem Limite de Tempo"
              : `Horário de Início: ${horarios![0].toLocaleString()}\n
              Horário de Término: ${horarios![1].toLocaleString()}`
          }\n
          Usuários: ${usuariosSelecionados?.join(", ")}`);
        router.push("/gerenciarAplicacao");
      } else {
        alert("Erro ao agendar a aplicação.");
      }
    } catch (error) {
      console.log(error);
      alert("Erro ao agendar a aplicação.");
    }
  }

  return (
    <div>
      <h1>Criando Aplicação</h1>
      <div>
        <label>
          <input
            type="checkbox"
            checked={semLimiteDeTempo}
            onChange={handleCheckboxChange}
          />
          Sem Limite de Tempo
        </label>
      </div>
      {!semLimiteDeTempo && (
        <DatePickerComponent callBackData={salvarHorarios} />
      )}
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
      <Button onClick={salvarDados}>Salvar</Button>
    </div>
  );
};

export default AplicacaoForm;
