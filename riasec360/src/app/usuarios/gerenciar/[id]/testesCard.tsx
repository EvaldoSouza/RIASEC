// components/AnsweredApplicationsCard.tsx
"use client";
import { format } from "date-fns";
import styles from "./AnsweredApplicationsCard.module.css"; // You can separate the styles if needed
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Aplicacao } from "@/app/types/types";

interface AnsweredApplicationsCardProps {
  answeredApplications: Aplicacao[];
}

const TestesCard: React.FC<AnsweredApplicationsCardProps> = ({
  answeredApplications,
}) => {
  return (
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
  );
};

export default TestesCard;
