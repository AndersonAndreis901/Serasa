import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import api from "../servicos/api";

export default function Login() {
  const [cpf_cnpj, setCpfCnpj] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function enviarLogin(e) {
    e.preventDefault();
    try {
      const resposta = await api.post("/auth/login", { cpf_cnpj, senha });
      localStorage.setItem("token", resposta.data.token);
      setErro("");
      alert("Login efetuado com sucesso!");
      // redirecionar para /painel, por exemplo
      window.location.href = "/painel";
    } catch (err) {
      setErro(err.response?.data?.error || "Erro no login");
    }
  }

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Faça seu Login 
      </Typography>
      <Box component="form" onSubmit={enviarLogin}>
        <TextField
          label="CPF ou CNPJ"
          variant="outlined"
          fullWidth
          margin="normal"
          value={cpf_cnpj}
          onChange={(e) => setCpfCnpj(e.target.value)}
        />
        <TextField
          label="Senha"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Entrar
        </Button>
        {erro && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {erro}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
