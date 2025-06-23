import React, { createContext, useContext, useState, useEffect } from "react";

// Cria o contexto
const AuthContext = createContext(null);

// Componente Provider que vai envolver seu app
export function AuthProvider({ children }) {
  // Guarda o usuário logado (aqui só o cpfCnpj como exemplo)
  const [user, setUser] = useState(null);

  // Carrega o usuário do localStorage (se tiver) ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Função para fazer login
  const login = (cpfCnpj) => {
    // Aqui você faria a chamada para a API real, validação, etc.
    // Por enquanto só salva o cpfCnpj no estado e localStorage
    const userData = { cpfCnpj };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Função para fazer logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para consumir o contexto
export function useAuth() {
  return useContext(AuthContext);
}
