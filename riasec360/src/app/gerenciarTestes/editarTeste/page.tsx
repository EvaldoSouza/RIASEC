import { buscarTeste, buscarCartoesEmTeste } from "@/app/lib/testesActions";
import { BuscarTodosCartoes } from "../../lib/cartoesActions";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function editarTeste({
  searchParams,
}: {
  searchParams: { id_teste: string };
}) {
  const id = searchParams.id_teste;
  if (!id) {
    return <h1>Teste inválido {id}</h1>;
  }

  const cartoes_usados = await buscarCartoesEmTeste(+id);
  //const todos_cartoes = await BuscarTodosCartoes();
  const teste = await buscarTeste(+id);
  if (!cartoes_usados) {
    return <h1>Não há cartões no teste {id}</h1>;
  }
  if (!teste) {
    return <h1>Teste não encontrado {id}</h1>;
  }

  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Editando Teste {id}
      </h1>
      <Link href={`/gerenciarTestes/editarTeste/adicionarCartoes/${id}`}>
        <Button>Adicionar Cartões</Button>
      </Link>
      <Link href={`/gerenciarTestes/editarTeste/removerCartoes/${id}`}>
        <Button>Remover Cartões</Button>
      </Link>
      <DataTable
        data={cartoes_usados}
        columns={columns}
        descricao_atual={teste?.descricao}
        id_teste={teste?.id_teste}
      />
    </div>
  );
}
