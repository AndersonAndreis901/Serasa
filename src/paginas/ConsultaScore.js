import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  List,
  ListItem,
  ListItemText,
  MenuItem,
} from "@mui/material";
import api from "../servicos/api";
import { useAuth } from "../servicos/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ConsultaScore() {
  const [tipo, setTipo] = useState("cpf");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [score, setScore] = useState(null);
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);
  const [fatores] = useState([
    { fator: "Histórico de pagamentos", impacto: "neutro" },
    { fator: "Dívidas ativas", impacto: "negativo" },
    { fator: "Tempo de cadastro", impacto: "positivo" },
  ]);
  const [historico, setHistorico] = useState([]);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("Você precisa estar logado para consultar o score.");
      navigate("/login");
    }
  }, [user, navigate]);

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

  const formatarData = (data) => {
    return new Date(data).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const consultar = async () => {
    if (loading) return;
    if (!cpfCnpj.trim()) {
      alert("Digite um CPF ou CNPJ antes de consultar.");
      return;
    }

    setLoading(true);
    setResultado("");
    setScore(null);

    try {
      const cpfLimpo = cpfCnpj.replace(/\D/g, "");
      const res = await api.post("/score/consultar", {
        cpf_cnpj: cpfLimpo,
      });

      const novoScore = res.data.score;

      let novoResultado = "";
      if (novoScore > 700) {
        novoResultado = "Score alto. Excelente histórico financeiro.";
      } else if (novoScore > 400) {
        novoResultado = "Score médio. Algumas melhorias podem ser feitas.";
      } else {
        novoResultado = "Score baixo. Atenção à sua saúde financeira.";
      }

      setScore(novoScore);
      setResultado(novoResultado);

      const historicoRes = await api.get(`/score/historico/${cpfLimpo}`);
      setHistorico(historicoRes.data);
    } catch (error) {
      console.error("Erro ao consultar score:", error);
      alert("Erro ao consultar score.");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ color: "black" }} gutterBottom>
          Consulta de Score
        </Typography>

        <Box display="flex" gap={2} mt={2} mb={3}>
          <TextField
            select
            label="Tipo"
            value={tipo}
            onChange={(e) => {
              setTipo(e.target.value);
              setCpfCnpj("");
            }}
            sx={{ width: 120 }}
            disabled={loading}
          >
            <MenuItem value="cpf">CPF</MenuItem>
            <MenuItem value="cnpj">CNPJ</MenuItem>
          </TextField>

          <TextField
            label={`Digite o ${tipo.toUpperCase()}`}
            variant="outlined"
            fullWidth
            value={cpfCnpj}
            onChange={(e) => setCpfCnpj(formatarCpfCnpj(e.target.value))}
            disabled={loading}
          />

          <Button
            variant="contained"
            color="success"
            onClick={consultar}
            disabled={loading}
          >
            {loading ? "Aguarde..." : "Consultar"}
          </Button>
        </Box>

        <Typography variant="subtitle1" sx={{ color: "black" }} gutterBottom>
          Resultado da Consulta
        </Typography>

        <Box
          sx={{
            backgroundColor: "#eaf6e9",
            textAlign: "center",
            py: 4,
            borderRadius: 1,
            mb: 4,
          }}
        >
          {score !== null ? (
            <>
              <Typography variant="h3" sx={{ color: "black", fontWeight: "bold" }}>
                {score}
              </Typography>
              <Typography variant="body1" sx={{ color: "black" }}>
                Pontuação em uma escala de 0 a 1000
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "black", mt: 1 }}>
                {resultado}
              </Typography>
            </>
          ) : (
            <Typography variant="body1" sx={{ color: "black" }}>
              Digite um CPF ou CNPJ e clique em consultar para ver o score.
            </Typography>
          )}
        </Box>

        {historico.length > 0 && (
          <>
            <Typography variant="h6" sx={{ color: "black", mb: 2 }}>
              Histórico das últimas 3 consultas para {cpfCnpj}
            </Typography>
            <List sx={{ mb: 4 }}>
              {historico.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{ bgcolor: "#f0f0f0", mb: 1, borderRadius: 1 }}
                >
                  <ListItemText
                    primary={`Score: ${item.score}`}
                    secondary={`Data da consulta: ${formatarData(item.data_consulta)}`}
                    primaryTypographyProps={{ sx: { color: "black" } }}
                    secondaryTypographyProps={{ sx: { color: "gray" } }}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}

        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          Fatores que impactam este score
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {fatores.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "black" }}>{row.fator}</TableCell>
                  <TableCell align="right" sx={{ color: "black" }}>
                    {row.impacto === "positivo" && (
                      <span style={{ color: "green" }}>+ Impacto positivo</span>
                    )}
                    {row.impacto === "negativo" && (
                      <span style={{ color: "red" }}>- Impacto negativo</span>
                    )}
                    {row.impacto === "neutro" && <span>Impacto neutro</span>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
