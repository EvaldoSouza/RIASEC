//mostrando os resultados de um usuário que está registrado nessa aplicação
//preciso chamar o card com as infos

import { getRespostasCartao, infosAplicacao } from "@/actions/aplicacaoActions";
import CardAplicacao from "./card";
import { nomeUnicoParticipante } from "@/actions/userActions";

export default async function ResultadoUsuario({
  params,
}: {
  params: { id: string; idUsuario: string };
}) {
  //tenho o id da aplicação e o id do usuario, o que mais preciso?
  const respostas = await getRespostasCartao(+params.id, +params.idUsuario);
  const infos_aplicacao = await infosAplicacao(+params.id);
  const nomeUsuario = await nomeUnicoParticipante(+params.idUsuario);

  //TODO checar se a aplicação foi respondida pelo usuário
  if (!respostas[0]) {
    return (
      <main>
        <h1>Usuario {nomeUsuario} não respondeu a aplicação</h1>
      </main>
    );
  } else {
    return (
      <div>
        <CardAplicacao
          key={params.id}
          dataInicio={infos_aplicacao.hora_inicial}
          idUsuario={+params.idUsuario}
          nomeUsuario={nomeUsuario}
          idTeste={infos_aplicacao.id_teste}
          idAplicacao={infos_aplicacao.id_aplicacao}
          answers={respostas} // Pass the corresponding answers to each CardAplicacao
        />
      </div>
    );
  }
}
