const pool = require("../db/banco");

exports.historicoScore = async (req, res) => {
  const { cpf_cnpj } = req.params;

  try {
    const resultado = await pool.query(
      `SELECT score, data_consulta 
       FROM score_consultas 
       WHERE cpf_cnpj = $1 
       ORDER BY data_consulta DESC 
       LIMIT 3`,
      [cpf_cnpj]
    );

    res.json(resultado.rows);
  } catch (err) {
    console.error("Erro ao buscar histórico de score:", err);
    res.status(500).json({ error: "Erro ao buscar histórico" });
  }
};
