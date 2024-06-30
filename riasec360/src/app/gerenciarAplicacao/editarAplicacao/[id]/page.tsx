import { DataTableAplicacaoUsuario } from "../../todasAplicacoes/[id]/(aplicacaoUsuarioTable)/data-table-aplicacao-usuario";
import AplicacaoForm from "./aplicacaoForm";

export default async function EditarAplicacao({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1> EDITANDO APLICAÇÃO {params.id}</h1>
    </div>
  );
}
