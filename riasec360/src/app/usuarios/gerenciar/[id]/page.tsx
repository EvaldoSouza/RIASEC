import { getUserByID } from "@/actions/userActions";
import { AplicacoesRespondidasPeloUsuario } from "@/actions/aplicacaoActions"; // Import the function to get answered applications
import { format } from "date-fns";
import styles from "./UserPage.module.css";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Fetch the user data
  const user = await getUserByID(+id);

  // Fetch the list of answered applications
  const answeredApplications = await AplicacoesRespondidasPeloUsuario(+id);

  if (!user) {
    return <p>Usuário não encontrado</p>;
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader className={styles.header}>
          <Avatar className={styles.avatar}>
            <AvatarImage src="" alt={user.nome} />
            <AvatarFallback>{user.nome[0]}</AvatarFallback>
          </Avatar>
          <CardTitle className={styles.title}>{user.nome}</CardTitle>
        </CardHeader>
        <CardContent className={styles.content}>
          <p>
            <strong>ID:</strong> {user.id_user}
          </p>
          <p>
            <strong>Nome:</strong> {user.nome}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Data de Nascimento:</strong>{" "}
            {format(new Date(user.data_nasc), "dd/MM/yyyy")}
          </p>
          <p>
            <strong>Email Verificado:</strong>{" "}
            {user.emailVerified ? "Sim" : "Não"}
          </p>
          <p>
            <strong>Conta Criada:</strong>{" "}
            {format(new Date(user.data_criacao), "dd/MM/yyyy")}
          </p>
          <p>
            <strong>Última Atualização:</strong>{" "}
            {user.data_atualizacao
              ? format(new Date(user.data_atualizacao), "dd/MM/yyyy")
              : "N/A"}
          </p>
        </CardContent>
        <CardFooter className={styles.footer}>
          <button className={styles["btn-primary"]}>Editar Perfil</button>
        </CardFooter>
      </Card>
      {/* Answered Applications Card */}
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle className={styles.sectionTitle}>
            Testes Respondidos
          </CardTitle>
        </CardHeader>
        <CardContent className={styles.content}>
          {answeredApplications && answeredApplications.length > 0 ? (
            <ul className={styles.applicationList}>
              {answeredApplications.map((app, index) => (
                <li key={index} className={styles.applicationItem}>
                  <strong>{app.id_teste}</strong> - Respondido em:{" "}
                  {app.hora_termino
                    ? format(new Date(app.hora_termino), "dd/MM/yyyy")
                    : "Data não disponível"}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma teste respondido.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPage;
