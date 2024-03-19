import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getCartoes() {
  try {
    const [rows] = await pool.query("SELECT * FROM `riasec`.`cartao`");
    return rows;
  } catch (error) {
    console.log("Erro ao pesquisar cartões", error);
    throw error;
  }
}

export async function getCartao(id) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM `riasec`.`cartao` WHERE id_cartao=?",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.log("Erro ao pesquisar o cartão", error);
    throw error;
  }
}

export async function createCartao(nome, texto) {
  try {
    const result = await pool.query(
      "INSERT INTO `riasec`.`cartao` (nome, texto) VALUES (?,?)",
      [nome, texto]
    );
    console.log(result); //melhorar isso
  } catch (error) {
    console.log("Erro ao criar o cartão", error);
    throw error;
  }
}
//Esse tratamento de erro está adequado?

export async function deleteCartao(id) {
  try {
    const result = await pool.query(
      "DELETE from `riasec`.`cartao` WHERE id_cartao=?",
      [id]
    );
    console.log(result);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
//Como vai ficar a tabela teste_cartao?

//Fazer a função de deletar cartão...ela é bem mais complicada
//Tem que envolver pelo menos um caso em que altera todos os testes que tenham esse cartão
