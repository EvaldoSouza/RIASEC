import { getServerSession } from "next-auth";

import SignUpForm from "@/app/components/forms/sign-up-form";
import { redirect } from "next/navigation";
export default async function Cadastrar() {
  return (
    <div>
      <SignUpForm />
    </div>
  );
}
