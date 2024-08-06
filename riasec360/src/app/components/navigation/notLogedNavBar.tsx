"use client";
import { Button } from "@/components/ui/button";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { Menubar } from "@radix-ui/react-menubar";
import Link from "next/link";

//TODO Como colocar esses botões na direita?
export function NotLogedNavBar() {
  return (
    <Menubar>
      <Link href="/">Profissional360</Link>
      <Link href={"/usuarios/cadastrar"}>
        <Button className="">Cadastrar</Button>
      </Link>
      <Link href="/usuarios/login">
        <Button> Login</Button>
      </Link>
    </Menubar>
  );
}
