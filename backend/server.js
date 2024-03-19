import express from "express";
import cors from "cors";
import {
  getCartoes,
  getCartao,
  createCartao,
} from "./database/cartoes_queries.js";

const app = express();
const port = 8080;

app.use(cors());

app.use(express.static("public")); //para jogar a pasta inteira no request
app.use(express.json()); //para poder aceitar json bodies no req e na res

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/todosCartoes", async (req, res) => {
  const cartoes = await getCartoes();
  res.send(cartoes);
});

app.get("/cartao/:id_cartao", async (req, res) => {
  const id = req.params.id_cartao;
  const cartao = await getCartao(id);
  res.send(cartao);
});

app.post("/cadastrarCartao", async (req, res) => {
  const { nome, texto } = req.body;
  const cartao = await createCartao(nome, texto);
  res.status(201);
  res.send(cartao);
});

// app.get("/todosCartoes", (req, res) => {
//   const cartoes = getCartoes();
//   if (cartoes) return res.json(cartoes);
// });
