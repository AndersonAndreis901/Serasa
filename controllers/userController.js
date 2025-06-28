const pool = require("../db/banco");

exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, cpf_cnpj, tipo FROM usuarios");
    const rows = result.rows;
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};


exports.createUser = async (req, res) => {
  const { cpf_cnpj, senha, tipo } = req.body;
  await pool.query("INSERT INTO usuarios (cpf_cnpj, senha, tipo) VALUES (?, ?, ?)", [cpf_cnpj, senha, tipo]);
  res.status(201).json({ message: "Usuário criado" });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { cpf_cnpj, tipo } = req.body;
  await pool.query("UPDATE usuarios SET cpf_cnpj = ?, tipo = ? WHERE id = ?", [cpf_cnpj, tipo, id]);
  res.json({ message: "Usuário atualizado" });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
  res.json({ message: "Usuário deletado" });
};
