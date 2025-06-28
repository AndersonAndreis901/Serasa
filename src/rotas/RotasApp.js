import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "../paginas/Cadastro";
import Login from "../paginas/Login";
import Painel from "../paginas/Painel";
import Header from "../componentes/Header";
import ConsultaScore from "../paginas/ConsultaScore";
import Home from "../paginas/Home";
import RecuperarSenha from "../paginas/RecuperarSenha";
import InformacoesConta from "../paginas/InformacoesConta";

export default function RotasApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/painel" element={<Painel />} />
        <Route path="/score" element={<ConsultaScore />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/conta" element={<InformacoesConta />} />
      </Routes>
    </BrowserRouter>
  );
}
