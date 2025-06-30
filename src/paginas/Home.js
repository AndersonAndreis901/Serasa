import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "#eaf6e9",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container maxWidth="md" sx={{ pt: 6, flex: 1 }}>
        {/* propaganda do sr barriga */}
        <Paper elevation={3} sx={{ p: 3, mb: 4, textAlign: "center" }}>
          <Box
            component="img"
            src="https://www.serasa.com.br/assets/cms/2022/3s0u07Ex-sr.-barriga-fundo.png"
            alt="Propaganda"
            sx={{
              width: "50%",
              height: "auto",
              borderRadius: 2,
              mb: 2,
            }}
          />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Confiança para seu crédito!
          </Typography>
          <Typography>
            Acompanhe seu score, veja oportunidades e cuide da sua saúde
            financeira com a ConfiaScore.
          </Typography>
        </Paper>

        {/* explicação de como funfa o score */}
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "#000", fontWeight: "bold" }}
              >
                Como funciona o Score?
              </Typography>
              <Typography>
                O ConfiaScore é uma pontuação de 0 a 1000 que mostra suas
                chances de conseguir crédito no mercado. Quanto maior o score,
                melhor o seu histórico financeiro. Ele é baseado em dados como
                pagamentos, dívidas, tempo de cadastro e comportamento de
                crédito.
              </Typography>

              <Box mt={3} textAlign="center">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#2e7d32",
                    "&:hover": { backgroundColor: "#27632a" },
                  }}
                  onClick={() => navigate("/score")}
                >
                  Consultar meu Score
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Rodapé */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#c8e6c9",
          py: 2,
          textAlign: "center",
          mt: "auto",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          © 2025 ConfiaScore. Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  );
}
