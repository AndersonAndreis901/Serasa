import React, { useEffect, useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import { useAuth } from "../servicos/AuthContext";
import api from "../servicos/api";

export default function InformacoesConta() {
  const { user } = useAuth();
  const [dados, setDados] = useState(null);

  useEffect(() => {
    if (user?.cpfCnpj) {
      api
        .get(`/clientes/${user.cpfCnpj}`)
        .then((res) => setDados(res.data))
        .catch((err) => {
          console.error("Erro ao buscar cliente:", err);
          setDados(null);
        });
    }
  }, [user]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Informações da Conta
        </Typography>
        {dados ? (
          <>
            <Typography variant="body1">Nome: {dados.nome}</Typography>
            <Typography variant="body1">Email: {dados.email}</Typography>
            <Typography variant="body1">CPF/CNPJ: {dados.cpf_cnpj}</Typography>
            <Typography variant="body1">
              Data de Nascimento:{" "}
              {new Date(dados.data_nascimento).toLocaleDateString("pt-BR")}
            </Typography>
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
