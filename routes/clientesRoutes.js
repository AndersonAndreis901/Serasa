const express = require("express");
const router = express.Router();
const pool = require("../db/banco");

router.get("/:cpfCnpj", async (req, res) => {
  const { cpfCnpj } = req.params;

  try {
    const resultado = await pool.query(
      `SELECT nome_razao_social, email, cpf_cnpj, telefone 
       FROM clientes 
       WHERE cpf_cnpj = $1`,
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
