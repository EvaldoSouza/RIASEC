import { getServerSession } from "next-auth";

import SignUpForm from "../../components/forms/sign-up-form";
import { redirect } from "next/navigation";
export default async function Cadastrar() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <div>
      <SignUpForm />
    </div>
  );
}
