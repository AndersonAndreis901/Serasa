import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../servicos/api";
import { useAuth } from "../servicos/AuthContext";

export default function Login() {
  const [cpf_cnpj, setCpfCnpj] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const formatarCpfCnpj = (valor) => {
    const numeros = valor.replace(/\D/g, "");
    if (numeros.length <= 11) {
      return numeros
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      return numeros
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
  };

  async function enviarLogin(e) {
    e.preventDefault();
    try {
      const resposta = await api.post("/auth/login", {
        cpf_cnpj: cpf_cnpj.replace(/\D/g, ""),
        senha,
      });

      localStorage.setItem("token", resposta.data.token);
      login(cpf_cnpj.replace(/\D/g, ""));
      setErro("");
      alert("Login efetuado com sucesso!");
      navigate("/");
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
          onChange={(e) => setCpfCnpj(formatarCpfCnpj(e.target.value))}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            cursor: "pointer",
            color: "#2e7d32",
            textDecoration: "underline",
            userSelect: "none",
          }}
          onClick={() => navigate("/recuperar-senha")}
        >
          Esqueci minha senha
        </Typography>
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
