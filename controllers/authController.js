const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/banco");

exports.register = async (req, res) => {
  const { cpf_cnpj, senha, tipo } = req.body;

  if (!cpf_cnpj || !senha || !tipo) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  if (senha.length > 12 || !/[!@#$%^&*]/.test(senha)) {
    return res.status(400).json({ error: "Senha inválida" });
  }

  try {
    const hashed = await bcrypt.hash(senha, 10);
    await pool.query(
      "INSERT INTO usuarios (cpf_cnpj, senha, tipo) VALUES ($1, $2, $3)",
      [cpf_cnpj, hashed, tipo]
    );
    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

exports.login = async (req, res) => {
  const { cpf_cnpj, senha } = req.body;

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE cpf_cnpj = $1", [cpf_cnpj]);
    const rows = result.rows;

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const user = rows[0];
    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    await pool.query("UPDATE usuarios SET ultimo_login = NOW() WHERE id = $1", [user.id]);

    const token = jwt.sign({ id: user.id, tipo: user.tipo }, process.env.SECRET, { expiresIn: "1h" });
    return res.json({ token });

  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

exports.resetPassword = async (req, res) => {
  const { cpf_cnpj, senha } = req.body;

  if (!cpf_cnpj || !senha) {
    return res.status(400).json({ error: "CPF/CNPJ e nova senha são obrigatórios" });
  }

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE cpf_cnpj = $1", [cpf_cnpj]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const updateResult = await pool.query(
      "UPDATE usuarios SET senha = $1 WHERE cpf_cnpj = $2",
      [senhaCriptografada, cpf_cnpj]
    );

    if (updateResult.rowCount === 0) {
      return res.status(500).json({ error: "Falha ao atualizar a senha" });
    }

    return res.json({ mensagem: "Senha atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
