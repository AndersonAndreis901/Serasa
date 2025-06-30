import React from "react";
import { Typography, Container } from "@mui/material";

export default function Painel() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center">
        Painel - Área protegida do usuário
      </Typography>
    </Container>
  );
}
