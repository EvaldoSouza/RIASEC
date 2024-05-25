//import { signIn } from "@/auth"
import { redirect } from "next/navigation";
import { signIn } from "../../../auth";
export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server";
        const sucess = await signIn("credentials", formData);
        console.log(sucess);
        if (sucess) {
          redirect("/");
        }
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  );
}
