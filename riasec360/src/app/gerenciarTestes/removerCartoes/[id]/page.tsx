import {
  buscarTeste,
  buscarCartoesEmTeste,
  cartoesNaoUsadosEmTeste,
} from "@/app/actions/testesActions";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function adicionarCartoes({
  params,
}: {
  params: { id: string };
}) {
  //preciso ter duas listas, lado a lado
  //uma mostrando os cartões que tem, e a outra mostrando os cartões disponíveis
  //ou só uma lista, com os cartões disponíveis?
  const cartoes = await buscarCartoesEmTeste(+params.id);
  if (!cartoes) {
    return <h1>Não há cartões no teste {params.id}</h1>;
  }
  return (
    <div>
      <DataTable
        data={cartoes}
        columns={columns}
        id_teste={+params.id}
      ></DataTable>
    </div>
  );
}
