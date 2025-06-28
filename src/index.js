import React from "react";
import ReactDOM from "react-dom/client";
import RotasApp from "./rotas/RotasApp";
import { ThemeProvider } from "@mui/material/styles";
import temaSerasa from "./temaSerasa";
import { AuthProvider } from "./servicos/AuthContext"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={temaSerasa}>
      <AuthProvider>
        <RotasApp />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
