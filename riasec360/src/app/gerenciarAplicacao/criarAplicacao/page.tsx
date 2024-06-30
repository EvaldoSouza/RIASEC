import { todosUsuarios } from "@/actions/userActions";
import AplicacaoForm from "./aplicacaoForm";
import { BuscarTodosTestes } from "@/actions/testesActions";
import DatePickerComponent from "./datepicker";

export default async function CriarAplicacao() {
  const usuarios = await todosUsuarios();
  const testes = await BuscarTodosTestes();
  return (
    <div>
      <AplicacaoForm testes={testes} usuarios={usuarios} />
    </div>
  );
}
