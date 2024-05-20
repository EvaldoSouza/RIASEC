import { columns } from "./columns";
import { DataTable } from "./data-table";
import { BuscarTodosCartoes } from "@/app/lib/cartoesActions";
import { ProfileForm } from "./create-new-form";

export default async function GerenciarCartoes() {
  const cartoes = await BuscarTodosCartoes();
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Todos os Cartões
      </h1>
      <div>
        <DataTable columns={columns} data={cartoes} />
      </div>
      <div>
        <ProfileForm />
      </div>
    </div>
  );
}

//Essa pagina tem que:
//Mostrar a lista de todos os cartões (acesso ao banco) -> Essa tabela é um componente externo
//Permitir criar, editar e deletar um cartão selecionado
//Pra ficar fofa, tem que ter um popup para editar o cartão (o que é dificil pra caralho)
