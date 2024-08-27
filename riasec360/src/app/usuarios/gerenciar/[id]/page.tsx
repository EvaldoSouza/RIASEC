import { getUserByID } from "@/actions/userActions";
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
    </div>
  );
};

export default UserPage;
