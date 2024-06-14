//import { DatePickerComponent } from "./datepicker";
import { todosUsuarios } from "@/actions/userActions";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import DatePickerComponent from "./datepicker";
export default async function CriarAplicacao() {
  //fazer uma forma de receber a data (calendário do shadcn) Preciso de um que dê as horas também
  //uma lista com os usuários (escolher vários)
  //uma lista com os testes (escolher apenas um)
  //uma lista com os grupos (escolher vários)
  //um campo para digitar o local
  //um botão para salvar o registro, ou mostrar um erro caso um usuário ou grupo já tenha aplicação marcada para esse horário
  const usuarios = await todosUsuarios();
  return (
    <div>
      <h1>Criando Aplicação</h1>
      <DatePickerComponent />
      <DataTable data={usuarios} columns={columns} />
    </div>
  );
}
