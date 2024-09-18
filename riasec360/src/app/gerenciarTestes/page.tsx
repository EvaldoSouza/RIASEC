"use server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { BuscarTodosTestes } from "../../actions/testesActions";

export default async function gerenciarTestes() {
  //Perguntar
  const testes = await BuscarTodosTestes();
  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "1.5rem",
        }}
      >
        Testes já Cadastrados
      </h1>
      <div>
        <Link href="/gerenciarTestes/criarTeste" passHref>
          <Button type="button">Criar Teste</Button>
        </Link>
      </div>
      <div>
        <DataTable data={testes} columns={columns} />
      </div>
    </div>
  );
}
