"use client";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export function NotLogedNavBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/">Profissional360</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={"/usuarios/cadastrar"}>
            <Button className="">Cadastrar</Button>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/usuarios/login">
            <Button> Login</Button>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
