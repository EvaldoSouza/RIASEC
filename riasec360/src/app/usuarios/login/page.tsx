//import LoginForm from "@/components/navigation/login-form";
import LoginForm from "@/app/components/forms/login-form";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Logar() {
  const session = await getServerSession();

  console.log(session);
  if (session) {
    redirect("/");
  }
  return (
    <div>
      <LoginForm />
    </div>
  );
}
