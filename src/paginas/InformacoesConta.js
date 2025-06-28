import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import { useAuth } from "../servicos/AuthContext";

export default function InformacoesConta() {
  const { usuario } = useAuth();

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Informações da Conta
        </Typography>
        {usuario ? (
          <>
            <Typography variant="body1">CPF/CNPJ: {usuario.cpf_cnpj}</Typography>
            {/* Você pode adicionar mais campos aqui no futuro */}
          </>
        ) : (
          <Typography variant="body1" color="error">
            Nenhuma informação disponível.
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
