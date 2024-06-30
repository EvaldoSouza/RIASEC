import { retornaParticipantesComNome } from "@/actions/aplicacaoActions";
import { columns } from "./(aplicacaoUsuarioTable)/columns";
import { DataTableAplicacaoUsuario } from "./(aplicacaoUsuarioTable)/data-table-aplicacao-usuario";
import { nomesParticipantes } from "@/actions/userActions";

export default async function Participantes({
  params,
}: {
  params: { id: string };
}) {
  const participantesMarcados = await retornaParticipantesComNome(+params.id);

  return (
    <div>
      <DataTableAplicacaoUsuario
        columns={columns}
        data={participantesMarcados}
      />
    </div>
  );
}
