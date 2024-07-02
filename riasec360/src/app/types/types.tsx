export type Teste = {
  id_teste: number;
  descricao: string | null;
  quant_cartoes: number | null;
  data_criacao: Date | null;
};

export type Usuario = {
  id_user: number;
  nome: string;
  email: string;
  emailVerified: Date | null;
  data_nasc: Date;
  senha: string;
  data_criacao: Date;
  data_atualizacao: Date | null;
  privilegio: string;
};

export type UsuarioResumido = {
  id_user: number;
  nome: string;
  email: string;
};

export type Cartao = {
  id_cartao: number;
  pergunta: string | null;
  tipo: string | null;
  em_uso: boolean | null;
};

export type Aplicacao = {
  id_aplicacao: number;
  id_grupo: number | null;
  id_teste: number;
  local: string | null;
  data_agendamento: Date;
  hora_inicial: Date | null;
  hora_termino: Date | null;
};

export type AplicacaoUsuario = {
  id_aplicacao: number;
  id_usuario: number;
  inicio_testagem: Date | null;
  fim_testagem: Date | null;
};

export type AplicacaoUsuarioComNome = {
  id_aplicacao: number;
  id_usuario: number;
  nome_usuario: string;
  inicio_testagem: Date | null;
  fim_testagem: Date | null;
};

export type RespostaCartao = {
  id_resposta: number;
  id_teste: number;
  id_cartao: number;
  resposta_competencia: string | null;
  resposta_afinidade: string | null;
  aplicacao_usuarioId_usuario: number;
  aplicacao_usuarioId_aplicacao: number;
};
