"use server";
import { BuscarTodosCartoes } from "../../lib/cartoesActions";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function CriarTeste() {
  const cartoes = await BuscarTodosCartoes();

  return (
    <div>
      <div>
        <DataTable columns={columns} data={cartoes} />
      </div>
      <div></div>
    </div>
  );
}
