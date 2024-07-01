"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LogOut() {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        signOut();
        router.push("/");
      }}
    >
      Logout
    </Button>
  );
}
