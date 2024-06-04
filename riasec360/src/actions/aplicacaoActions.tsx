import { usuarioDaSessao } from "./userActions";

//retorna o id do primeiro teste agendado para esse usuário
export async function idProximoTeste() {
  const usuario = await usuarioDaSessao();
  console.log("função idProximoTeste ainda em mock");
  return 1;
}
