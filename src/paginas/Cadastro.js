import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  MenuItem,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IMaskInput } from "react-imask";

export default function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cpf_cnpj: "",
    senha: "",
    confirmarSenha: "",
    tipo: "PF",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cpf_cnpj: formData.cpf_cnpj.replace(/\D/g, ""), 
          senha: formData.senha,
          tipo: formData.tipo,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
      } else {
        alert(data.error || "Erro ao cadastrar");
      }
    } catch (err) {
      alert("Erro de conexão com o servidor");
    }
  };

  const mask = formData.tipo === "PF" ? "000.000.000-00" : "00.000.000/0000-00";

  return (
    <Box
      sx={{
        backgroundColor: "#eaf6e9",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography
            variant="h5"
            sx={{ mb: 3, color: "#2e7d32", fontWeight: "bold", textAlign: "center" }}
          >
            Criar Conta
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              select
              label="Tipo de Usuário"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              margin="normal"
              required
            >
              <MenuItem value="PF">Pessoa Física</MenuItem>
              <MenuItem value="PJ">Pessoa Jurídica</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label={formData.tipo === "PF" ? "CPF" : "CNPJ"}
              name="cpf_cnpj"
              margin="normal"
              required
              value={formData.cpf_cnpj}
              onChange={handleChange}
              InputProps={{
                inputComponent: IMaskInput,
                inputProps: {
                  mask: mask,
                },
              }}
            />

            <TextField
              fullWidth
              label="Criar Senha"
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
              margin="normal"
              required
              helperText="Máximo 12 caracteres e 1 caractere especial"
            />

            <TextField
              fullWidth
              label="Confirmar Senha"
              name="confirmarSenha"
              type="password"
              value={formData.confirmarSenha}
              onChange={handleChange}
              margin="normal"
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#2e7d32",
                "&:hover": { backgroundColor: "#27632a" },
              }}
            >
              Cadastrar
            </Button>

            <Box mt={2} textAlign="center">
              <Link href="/login" underline="hover">
                Já tem conta? Faça login
              </Link>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
