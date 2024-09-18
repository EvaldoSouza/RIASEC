import { todosUsuarios } from "@/actions/userActions";
import { DataTableAplicacaoUsuario } from "../../[id]/(aplicacaoUsuarioTable)/data-table-aplicacao-usuario";
import AplicacaoForm from "./aplicacaoForm";
import { BuscarTodosTestes } from "@/actions/testesActions";

export default async function EditarAplicacao({
  params,
}: {
  params: { id: string };
}) {
  const usuarios = await todosUsuarios();
  const testes = await BuscarTodosTestes();
  return (
    <div>
      <h1> EDITANDO APLICAÇÃO {params.id}</h1>
      <AplicacaoForm
        testes={testes}
        usuarios={usuarios}
        idAplicacao={+params.id}
      />
    </div>
  );
}
