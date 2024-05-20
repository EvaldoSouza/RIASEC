import { AppBar, Stack, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link"; // Import Next.js Link for routing

interface NavBarProps {
  userRole: string;
}
const NavBar: React.FC<NavBarProps> = ({ userRole }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Stack direction={"row"} spacing={2}>
          <Link href="/" passHref>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Profissional360
            </Typography>
          </Link>
          {userRole === "adm" && (
            <div>
              <Link href="/gerenciarCartoes" passHref>
                <Button variant="contained" color="secondary">
                  Gerenciar Cartões
                </Button>
              </Link>
            </div>
          )}
          {userRole === "adm" && (
            <div>
              <Link href="/gerenciarTestes" passHref>
                <Button variant="contained" color="secondary">
                  Gerenciar Testes
                </Button>
              </Link>
            </div>
          )}
          <div>
            <Link href="/realizarTeste" passHref>
              <Button variant="contained" color="secondary">
                Realizar Teste
              </Button>
            </Link>
          </div>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
