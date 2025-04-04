"use server";
import { BuscarTodosCartoes } from "../../../actions/cartoesActions";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import React from "react";

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
