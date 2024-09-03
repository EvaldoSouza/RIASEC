// pages/users/[id]/UserPage.tsx
"use server";
import { getUserByID } from "@/actions/userActions"; // Assume you have an update function
import { updateUserByID } from "@/actions/adminActions";
import {
  AplicacoesRespondidasPeloUsuario,
  getRespostasCartao,
} from "@/actions/aplicacaoActions";
import styles from "./UserPage.module.css";
import InfosUsuarioCard from "./infosUsuarioCard";
import CardAplicacao from "./testesCard";
import { Usuario } from "@/app/types/types";

const UserPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Fetch the user data
  const user = await getUserByID(+id);

  // Fetch the list of answered applications
  const answeredApplications = await AplicacoesRespondidasPeloUsuario(+id);

  if (!user) {
    return <p>Usuário não encontrado</p>;
  }

  const promises = answeredApplications.map((item) =>
    getRespostasCartao(item.id_aplicacao, user.id_user)
  );
  const results = await Promise.all(promises);

  console.log(results);
  return (
    <div className={styles.container}>
      <InfosUsuarioCard user={user} />
      <div>
        {answeredApplications.map((aplicacao, index) => (
          <CardAplicacao
            key={index}
            dataInicio={aplicacao.hora_inicial}
            idUsuario={user.id_user}
            nomeUsuario={user.nome}
            idTeste={aplicacao.id_teste}
            idAplicacao={aplicacao.id_aplicacao}
            answers={results[index]} // Pass the corresponding answers to each CardAplicacao
          />
        ))}
      </div>
    </div>
  );
};

export default UserPage;
