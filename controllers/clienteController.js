const pool = require("../db/banco");

const obterDadosCliente = async (req, res) => {
  try {
    const { cpfCnpj } = req.params;

    const { rows } = await pool.query(
      "SELECT nome_razao_social, email, cpf_cnpj, telefone FROM clientes WHERE cpf_cnpj = $1",
      [cpfCnpj]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Erro ao buscar cliente:", err);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

module.exports = {
  obterDadosCliente,
};
