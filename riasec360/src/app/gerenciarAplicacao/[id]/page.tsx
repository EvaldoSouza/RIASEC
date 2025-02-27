import { retornaParticipantesComNome } from "@/actions/aplicacaoActions";
import { columns } from "./(aplicacaoUsuarioTable)/columns";
import { DataTableAplicacaoUsuario } from "./(aplicacaoUsuarioTable)/data-table-aplicacao-usuario";
import React from "react";

export default async function Participantes({
  params,
}: {
  params: { id: string };
}) {
  const participantesMarcados = await retornaParticipantesComNome(+params.id);

  return (
    <div>
      <h1>Participantes da Aplicação</h1>
      <DataTableAplicacaoUsuario
        columns={columns}
        data={participantesMarcados}
      />
    </div>
  );
}
