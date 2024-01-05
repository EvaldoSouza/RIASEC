 INSERT INTO usuario (nome, data_nasc, login, senha) VALUES ('Teste Um', '2001-01-02', 'teste1', 'teste');
INSERT INTO usuario (nome, data_nasc, login, senha) VALUES ('Teste Dois', '01-02-2001', 'teste2', 'teste');

-- Insert into grupo table
INSERT INTO grupo (nome, descricao)
VALUES ('Development Team', 'Team responsible for software development');

-- Insert into teste table
INSERT INTO teste (descricao, quant_cartoes)
VALUES ('Sample Test', 1);

-- Insert into cartao table
INSERT INTO cartao (nome, texto)
VALUES ('Card 1', 'This is the text for Card 1');

-- Insert into teste_cartao table
INSERT INTO teste_cartao (id_teste, id_cartao)
VALUES (1, 1);  -- Assuming you have the respective IDs in the teste and cartao tables

-- Insert into aplicacao table
INSERT INTO aplicacao (id_user, id_grupo, id_teste, local, data_hora)
VALUES (1, 1, 1, 'Test Location', CURRENT_TIMESTAMP);

-- Insert into resposta_cartao table
INSERT INTO resposta_cartao (id_aplicacao, id_cartao, descricao, tipo_resposta)
VALUES (1, 1, 'Answer for Card 1', 'Text');

-- Insert into usuario_grupo table
INSERT INTO usuario_grupo (id_usuario, id_grupo)
VALUES (1, 1);  -- Assuming you have the respective IDs in the usuario and grupo tables
