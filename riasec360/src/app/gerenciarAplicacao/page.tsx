import { retornaTodasAplicacoes } from "@/actions/aplicacaoActions";
import { columns } from "./(aplicacaoTable)/columns";
import { DataTableAplicacoes } from "./(aplicacaoTable)/data-table-aplicacao";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function TodasAplicacoes() {
  const aplicacoes = await retornaTodasAplicacoes();
  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "1.5rem",
        }}
      >
        Lista de Aplicações
      </h1>

      <DataTableAplicacoes columns={columns} data={aplicacoes} />

      <Button asChild style={{ margin: "0.5rem" }}>
        <Link href={"/gerenciarAplicacao/criarAplicacao"}>Agendar</Link>
      </Button>
      <Button asChild>
        <Link href={"/realizarTeste"}>Realizar</Link>
      </Button>
    </div>
  );
}
