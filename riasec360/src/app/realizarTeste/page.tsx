"use server";

import { todasAplicacoesDoUsuario } from "@/actions/aplicacaoActions";
import { usuarioDaSessao } from "@/actions/userActions";
import ListaAplicacoes from "./listaAplicacoes";
import { redirect } from "next/navigation";
import { checarAplicacaoFoiRespondida } from "@/actions/aplicacaoActions";

export default async function Page() {
  const usuario = await usuarioDaSessao();

  if (!usuario) {
    redirect("/");
  }

  const aplicacoes = await todasAplicacoesDoUsuario(usuario.id_user);

  if (!aplicacoes.length) {
    return <h1>Sem testes agendados no momento</h1>;
  }

  const now = new Date(); // Hora atual

  const aplicacoesNaoRespondidas = [];
  const aplicacoesAgendadasMasNaoDisponiveis = [];

  for (const aplicacao of aplicacoes) {
    const isAnswered = await checarAplicacaoFoiRespondida(
      aplicacao.id_aplicacao,
      usuario.id_user
    );

    if (isAnswered) {
      continue;
    }

    const start = aplicacao.hora_inicial
      ? new Date(aplicacao.hora_inicial)
      : null;
    const end = aplicacao.hora_termino
      ? new Date(aplicacao.hora_termino)
      : null;

    let isInTimeWindow = false;

    if (!start && !end) {
      isInTimeWindow = true;
    } else if (start && end) {
      isInTimeWindow = now >= start && now <= end;
    } else if (start && !end) {
      isInTimeWindow = now >= start;
    }

    if (isInTimeWindow) {
      aplicacoesNaoRespondidas.push(aplicacao);
    } else if (start && now < start) {
      aplicacoesAgendadasMasNaoDisponiveis.push(aplicacao);
    }
  }

  return (
    <div style={styles.container}>
      {aplicacoesAgendadasMasNaoDisponiveis.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Testes Agendados, mas Não Disponíveis Ainda:
          </h2>
          <ul style={styles.list}>
            {aplicacoesAgendadasMasNaoDisponiveis.map((aplicacao) => (
              <li key={aplicacao.id_aplicacao} style={styles.listItem}>
                Teste agendado para{" "}
                {aplicacao.hora_inicial?.toLocaleString() ||
                  "Data não disponível"}
              </li>
            ))}
          </ul>
        </div>
      )}
      {aplicacoesNaoRespondidas.length > 0 && (
        <ListaAplicacoes
          aplicacoes={aplicacoesNaoRespondidas}
          disponivel={true}
        />
      )}

      <div>
        <ListaAplicacoes aplicacoes={aplicacoes} disponivel={false} />
      </div>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  section: {
    marginBottom: "20px",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  list: {
    listStyleType: "none",
    padding: "0",
    margin: "0",
  },
  listItem: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
};
