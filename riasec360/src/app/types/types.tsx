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
