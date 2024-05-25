import {
  buscarTeste,
  buscarCartoesEmTeste,
  cartoesNaoUsadosEmTeste,
} from "@/actions/testesActions";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function adicionarCartoes({
  params,
}: {
  params: { id: string };
}) {
  const cartoesNaoUsados = await cartoesNaoUsadosEmTeste(+params.id);
  if (!cartoesNaoUsados) {
    return <h1>Não há cartões que não são usados no teste {params.id}</h1>;
  }
  return (
    <div>
      <DataTable
        data={cartoesNaoUsados}
        columns={columns}
        id_teste={+params.id}
      ></DataTable>
    </div>
  );
}
