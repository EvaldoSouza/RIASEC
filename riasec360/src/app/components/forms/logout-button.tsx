"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function LogOut() {
  return (
    <Button
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </Button>
  );
}
