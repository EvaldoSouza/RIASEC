//import { DatePickerComponent } from "./datepicker";
import { todosUsuarios } from "@/actions/userActions";
import { columns as columnsUsers } from "./(usersTable)/columns";
import { columns as columnsTeste } from "./(testeTable)/columns";
import { DataTableUsers } from "./(usersTable)/data-table-users";
import DatePickerComponent from "./datepicker";
import { DataTableTestes } from "./(testeTable)/data-table-testes";
import { BuscarTodosTestes } from "@/actions/testesActions";
export default async function CriarAplicacao() {
  //fazer uma forma de receber a data (calendário do shadcn) Preciso de um que dê as horas também
  //uma lista com os usuários (escolher vários)
  //uma lista com os testes (escolher apenas um)
  //uma lista com os grupos (escolher vários)
  //um campo para digitar o local
  //um botão para salvar o registro, ou mostrar um erro caso um usuário ou grupo já tenha aplicação marcada para esse horário
  const usuarios = await todosUsuarios();
  const testes = await BuscarTodosTestes();
  return (
    <div>
      <h1>Criando Aplicação</h1>
      <DatePickerComponent />
      <DataTableTestes data={testes} columns={columnsTeste} />
      <DataTableUsers data={usuarios} columns={columnsUsers} />
    </div>
  );
}
