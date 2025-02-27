import { columns } from "./columns";
import { DataTable } from "./data-table";
import { BuscarTodosCartoes, updateCartoesUso } from "@/actions/cartoesActions";
//import { ProfileForm } from "./criarCartao/criarCartaoForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default async function GerenciarCartoes() {
  const cartoes = await BuscarTodosCartoes();
  //TODO achar um lugar melhor, um jeito melhor de fazer esse update, pq acho que vai ficar lento pra caramba
  await updateCartoesUso();
  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "1.5rem",
        }}
      >
        Cartões já cadastrados
      </h1>
      <Button>
        <Link href={`/gerenciarCartoes/criarCartao`}> Adicionar</Link>
      </Button>
      <div>
        <DataTable columns={columns} data={cartoes} />
      </div>
    </div>
  );
}

//Essa pagina tem que:
//Mostrar a lista de todos os cartões (acesso ao banco) -> Essa tabela é um componente externo
//Permitir criar, editar e deletar um cartão selecionado
//Pra ficar fofa, tem que ter um popup para editar o cartão (o que é dificil pra caralho)
