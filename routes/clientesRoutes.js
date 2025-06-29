const express = require("express");
const router = express.Router();
const pool = require("../db/banco"); // caminho correto para seu pool

// GET /api/clientes/:cpfCnpj
router.get("/:cpfCnpj", async (req, res) => {
  const { cpfCnpj } = req.params;

  try {
    const resultado = await pool.query(
      "SELECT nome, email, data_nascimento, cpf_cnpj FROM clientes WHERE cpf_cnpj = $1",
      [cpfCnpj]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

module.exports = router;
