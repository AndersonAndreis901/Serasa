import React, { useState } from "react";
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

export default function ConsultaScore() {
  const [tipo, setTipo] = useState("cpf");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [score, setScore] = useState(null);
  const [resultado, setResultado] = useState("");
  const [fatores] = useState([
    { fator: "Histórico de pagamentos", impacto: "neutro" },
    { fator: "Dívidas ativas", impacto: "negativo" },
    { fator: "Tempo de cadastro", impacto: "positivo" },
  ]);
  const [historico, setHistorico] = useState([]);

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

  const consultar = () => {
    if (!cpfCnpj.trim()) {
      alert("Digite um CPF ou CNPJ antes de consultar.");
      return;
    }

    const novoScore = Math.floor(Math.random() * 1000);
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

    const dataConsulta = new Date();

    setHistorico((old) => {
      const novo = [{ cpfCnpj, score: novoScore, data: dataConsulta }, ...old];
      return novo.slice(0, 50);
    });
  };

  const historicoFiltrado = historico
    .filter((item) => item.cpfCnpj === cpfCnpj)
    .slice(0, 3);

  const formatarData = (data) => {
    return data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
          />

          <Button variant="contained" color="success" onClick={consultar}>
            Consultar
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
              <Typography
                variant="h3"
                sx={{ color: "black", fontWeight: "bold" }}
              >
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

        {historicoFiltrado.length > 0 && (
          <>
            <Typography variant="h6" sx={{ color: "black", mb: 2 }}>
              Histórico das últimas 3 consultas para {cpfCnpj}
            </Typography>
            <List sx={{ mb: 4 }}>
              {historicoFiltrado.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{ bgcolor: "#f0f0f0", mb: 1, borderRadius: 1 }}
                >
                  <ListItemText
                    primary={`Score: ${item.score}`}
                    secondary={`Data da consulta: ${formatarData(item.data)}`}
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
                      <span style={{ color: "green" }}>
                        + Impacto positivo
                      </span>
                    )}
                    {row.impacto === "negativo" && (
                      <span style={{ color: "red" }}>
                        - Impacto negativo
                      </span>
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
