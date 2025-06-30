import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
} from "@mui/material";

export default function RecuperarSenha() {
  const [etapa, setEtapa] = useState(1);
  const [tipo, setTipo] = useState("cpf");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const formatarCpfCnpj = (valor) => {
    const numeros = valor.replace(/\D/g, "");
    if (tipo === "cpf") {
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

  const verificarCpfCnpj = () => {
    if (!cpfCnpj.trim()) {
      setErro("Digite o CPF ou CNPJ.");
      return;
    }
    setErro("");
    setEtapa(2);
  };

  const salvarNovaSenha = async () => {
    if (!novaSenha || !confirmaSenha) {
      setErro("Preencha ambos os campos de senha.");
      return;
    }
    if (novaSenha !== confirmaSenha) {
      setErro("As senhas não coincidem.");
      return;
    }
    setErro("");

    try {
      const response = await fetch("http://localhost:3001/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cpf_cnpj: cpfCnpj.replace(/\D/g, ""), 
          senha: novaSenha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Erro ao atualizar senha. Tente novamente.");
        return;
      }

      setSucesso("Senha alterada com sucesso! Você já pode fazer login.");
      setEtapa(1);
      setCpfCnpj("");
      setNovaSenha("");
      setConfirmaSenha("");
    } catch (e) {
      setErro("Erro ao atualizar senha. Tente novamente.");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Recuperar Senha
      </Typography>

      {etapa === 1 && (
        <Box>
          <TextField
            select
            label="Tipo"
            value={tipo}
            onChange={(e) => {
              setTipo(e.target.value);
              setCpfCnpj("");
              setErro("");
              setSucesso("");
            }}
            fullWidth
            margin="normal"
          >
            <MenuItem value="cpf">CPF</MenuItem>
            <MenuItem value="cnpj">CNPJ</MenuItem>
          </TextField>

          <TextField
            label={`Digite seu ${tipo.toUpperCase()}`}
            variant="outlined"
            fullWidth
            margin="normal"
            value={cpfCnpj}
            onChange={(e) => setCpfCnpj(formatarCpfCnpj(e.target.value))}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={verificarCpfCnpj}
          >
            Confirmar
          </Button>
        </Box>
      )}

      {etapa === 2 && (
        <Box>
          <TextField
            label="Nova senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
          />
          <TextField
            label="Confirmar nova senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={salvarNovaSenha}
          >
            Salvar nova senha
          </Button>
        </Box>
      )}

      {erro && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {erro}
        </Typography>
      )}
      {sucesso && (
        <Typography color="success.main" align="center" sx={{ mt: 2 }}>
          {sucesso}
        </Typography>
      )}
    </Container>
  );
}
