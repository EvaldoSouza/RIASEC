import { NextResponse } from "next/server";
import { converStringToDate } from "@/lib/utils";
import { cadastrarUsuario } from "@/actions/userActions";
export async function POST(request: Request) {
  try {
    const { username, email, password, dateOfBirth } = await request.json();
    //validation? Já to fazendo isso em outro lugar, não?
    //Por enquanto vamo seguinto o tutorial
    console.log("Route: ", username, email, password, dateOfBirth);

    const dataNasc = converStringToDate(dateOfBirth);
    //logica para processar a requisição de cadastrar usuário no banco
    try {
      const novo_usuario = await cadastrarUsuario(
        username,
        email,
        password,
        dataNasc
      );
      console.log(novo_usuario);
      return NextResponse.redirect(new URL("/usuarios/login", request.url));
    } catch (error) {
      console.log(
        "Algo deu errado na submissão do formulário de cadastrar um novo usuário"
      );
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ message: "deu certo?" });
}
