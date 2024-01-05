CREATE TABLE usuario (
  id_user serial PRIMARY KEY,
  nome varchar(50),
  data_nasc date,
  login varchar(50) UNIQUE,
  senha varchar(50)
);

CREATE TABLE grupo (
  id_grupo serial PRIMARY KEY,
  nome varchar(50) UNIQUE,
  descricao varchar(300)
);

CREATE TABLE teste (
  id_teste serial PRIMARY KEY,
  descricao varchar(300),
  quant_cartoes integer
);

CREATE TABLE cartao (
  id_cartao serial PRIMARY KEY,
  nome varchar(50),
  texto varchar(300)
);

CREATE TABLE teste_cartao (
  id_teste integer REFERENCES teste,
  id_cartao integer REFERENCES cartao
);

CREATE TABLE aplicacao (
  id_aplicacao serial PRIMARY KEY,
  id_user integer REFERENCES usuario,
  id_grupo integer REFERENCES grupo,
  id_teste integer REFERENCES teste,
  local varchar(50),
  data_hora timestamp
);

CREATE TABLE resposta_cartao (
  id_resposta serial PRIMARY KEY,
  id_aplicacao integer REFERENCES aplicacao,
  id_cartao integer REFERENCES cartao,
  descricao varchar(300),
  tipo_resposta varchar(50)
);

CREATE TABLE usuario_grupo (
  id_usuario integer REFERENCES usuario,
  id_grupo integer REFERENCES grupo
);
