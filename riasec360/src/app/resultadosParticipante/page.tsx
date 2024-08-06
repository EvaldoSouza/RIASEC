import {
  AplicacoesRespondidasPeloUsuario,
  getRespostasCartao,
} from "@/actions/aplicacaoActions";
import { nomeUnicoParticipante, usuarioDaSessao } from "@/actions/userActions";
import CardAplicacao from "./card";
import { Aplicacao } from "../types/types";

export default async function resultadosUsuario(idUsuario?: number) {
  // First, get the user ID
  let id_usuario: number = -1;
  if (typeof idUsuario === "number") {
    id_usuario = idUsuario;
  } else {
    try {
      const usuario = await usuarioDaSessao();
      if (usuario) {
        id_usuario = usuario?.id_user;
      }
    } catch (error) {
      console.log("Algo deu errado com o usuario: ", error);
      return <h1>Algum problema com o usuario!</h1>;
    }
  }

  if (id_usuario < 0) {
    return <h1>Algum problema com o usuario!</h1>;
  }

  // Get the applications responded by the user
  const aplicacoes = await AplicacoesRespondidasPeloUsuario(id_usuario);
  const nomeUsuario = await nomeUnicoParticipante(id_usuario);

  // Fetch the answers for each application
  const promises = aplicacoes.map((item) =>
    getRespostasCartao(item.id_aplicacao, id_usuario)
  );
  const results = await Promise.all(promises);

  return (
    <div>
      {aplicacoes.map((aplicacao, index) => (
        <CardAplicacao
          key={index}
          dataInicio={aplicacao.hora_inicial}
          idUsuario={id_usuario}
          nomeUsuario={nomeUsuario}
          idTeste={aplicacao.id_teste}
          idAplicacao={aplicacao.id_aplicacao}
          answers={results[index]} // Pass the corresponding answers to each CardAplicacao
        />
      ))}
    </div>
  );
}
