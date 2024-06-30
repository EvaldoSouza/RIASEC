import { retornaTodasAplicacoes } from "@/actions/aplicacaoActions";
import { columns } from "./(aplicacaoTable)/columns";
import { DataTableAplicacoes } from "./(aplicacaoTable)/data-table-aplicacao";

export default async function TodasAplicacoes() {
  const aplicacoes = await retornaTodasAplicacoes();
  return (
    <div>
      <DataTableAplicacoes columns={columns} data={aplicacoes} />
    </div>
  );
}
