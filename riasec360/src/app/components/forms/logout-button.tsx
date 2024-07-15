"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export function LogOut() {
  const router = useRouter();
  return (
    <Button
      onMouseDown={() => {
        signOut();
        //redirect("/");
        //criar outra pagina, e nela fazer o logout
      }}
    >
      Logout
    </Button>
  );
}
