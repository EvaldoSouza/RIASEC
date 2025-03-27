import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import fs from "fs/promises";
import { getServerSession } from "next-auth";
import React from "react";
import { LogOut } from "./components/forms/logout-button";

export default async function Inicial() {
  try {
    const tipoFile = await fs.readFile("public/tipoRIASEC.json");
    const descFile = await fs.readFile("public/testeDesc.json");

    const displayTypes = JSON.parse(tipoFile.toString());
    const displayDesc = JSON.parse(descFile.toString());

    const session = await getServerSession();
    return (
      <>
        <Box sx={{ width: "100%" }}>
          <Typography variant="h6" padding={"16px"}>
            {displayDesc.descricao_teste}
          </Typography>
          <List>
            {Object.keys(displayTypes).map((key) => (
              <ListItem key={key}>
                <ListItemText
                  primary={
                    <Typography component={"span"} variant="body1">
                      {key}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      component={"span"}
                      variant="body2"
                      color={"black"}
                    >
                      {displayTypes[key]}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </>
    );
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
