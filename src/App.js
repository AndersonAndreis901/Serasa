import React from "react";
import RotasApp from "./rotas/RotasApp";
import { AuthProvider } from "./servicos/AuthContext";

function App() {
  return (
    <AuthProvider>
      <RotasApp />
    </AuthProvider>
  );
}

export default App;
