//Vou fazer tipo uma "sala" de teste.
//O usuário só pode realizar um teste que foi agendado, e só um teste por vez
//Vou checar, no banco, se tem uma aplicação para aquele horário
//Se tiver, abre o teste.
//Se não tiver, mostra o horário da aplicação mais próxima, ou informa que não tem aplicação agendada
//Quanto ao teste em si.
//A página vai buscar os cartões contidos no teste, na ordem que foram armazenados
//Vai ter uma função que acrescenta em cada cartão uma escala likert
//E os cartões serão montados em uma estrutura tipo carrossel, só podendo passar para o próximo se responder o atual
//No final finaliza o teste, e salva as respostas.

"use server";
import {
  aplicacoesAFazerDoUsuario,
  todasAplicacoesDoUsuario,
} from "@/actions/aplicacaoActions";
import { buscarCartoesEmTeste } from "@/actions/testesActions";
//import { Likert } from "./likert";
import Likert from "./likert";
import { Cartao } from "../types/types";
import { usuarioDaSessao } from "@/actions/userActions";
import Dnd from "./dragDrop";

interface CartoesArray {
  cartoes: Cartao[];
}

export default async function realizarTeste() {
  //a página não recebe nada, pois ela faz as consultas internamente
  const usuario = await usuarioDaSessao();

  if (!usuario) {
    return <h1>Algum problema com o usuario</h1>;
  }
  //const aplicacoes = await aplicacoesAFazerDoUsuario(usuario?.id_user);
  const aplicacoes = await todasAplicacoesDoUsuario(usuario.id_user);
  console.log(aplicacoes[0]);

  if (!aplicacoes[0]) {
    return <h1>Sem testes no momento</h1>;
  }
  //TODO conferir a data aqui, e mostrar ela se não for a data de aplicação

  //Estou considerando que esse array vem ordenado.
  const cartoes: Cartao[] | undefined = await buscarCartoesEmTeste(
    aplicacoes[0].id_teste
  );

  const resposta: string[] = ["pergunta 1", "pergunta 2", "pergunta 3"];

  if (cartoes) {
    // return (
    //   <Likert
    //     cartoes={cartoes}
    //     idAplicacao={aplicacoes[0].id_aplicacao}
    //     idTeste={aplicacoes[0].id_teste}
    //     idUsuario={usuario?.id_user}
    //   />
    // );
    return (
      <Dnd
        cartoes={cartoes}
        idAplicacao={aplicacoes[0].id_aplicacao}
        idTeste={aplicacoes[0].id_teste}
        idUsuario={usuario?.id_user}
      ></Dnd>
    );
  } else {
    return <h1>Teste sem cartões</h1>;
  }

  //criar um componente com o cartão e a escala likert
  //mostrar os componentes em carrossel
}
