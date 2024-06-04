import { buscarTeste, buscarCartoesEmTeste } from "@/actions/testesActions";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function editarTeste({
  params,
}: {
  params: { id: string };
}) {
  const id = +params.id;
  if (!id) {
    return <h1>Teste inválido {id}</h1>;
  }

  const teste = await buscarTeste(id);
  if (!teste) {
    return <h1>Teste não encontrado {id}</h1>;
  }
  const cartoes_usados = await buscarCartoesEmTeste(id);
  if (!cartoes_usados) {
    return <h1>Não há cartões no teste {id}</h1>;
  }

  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Editando Teste {id}
      </h1>
      <DataTable
        data={cartoes_usados}
        columns={columns}
        descricao_atual={teste?.descricao}
        id_teste={teste?.id_teste}
      />
    </div>
  );
}
