const pool = require("../db/banco");
const dayjs = require("dayjs");

function somaLetras(nome) {
  if (!nome) return 0;
  return nome.replace(/\s+/g, '').length;
}

function somaDigitosTelefone(telefone) {
  if (!telefone) return 0;
  const numeros = telefone.replace(/\D/g, '');
  return numeros.split('').reduce((acc, num) => acc + parseInt(num), 0);
}

exports.consultarScore = async (req, res) => {
  const { cpf_cnpj } = req.body;

  try {
    const userResult = await pool.query(
      "SELECT id, tipo, ultimo_login FROM usuarios WHERE cpf_cnpj = $1",
      [cpf_cnpj]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    const usuario = userResult.rows[0];
    const usuarioId = usuario.id;

    const clienteResult = await pool.query(
      "SELECT id, nome_razao_social, telefone FROM clientes WHERE cpf_cnpj = $1",
      [cpf_cnpj]
    );
    if (clienteResult.rows.length === 0) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }
    const cliente = clienteResult.rows[0];
    const clienteId = cliente.id;

    // score inicial
    let score = 500;
    console.log("Score inicial:", score);

    // regra 1: letras do nome
    const letrasNome = somaLetras(cliente.nome_razao_social);
    const pontosNome = letrasNome * 10;
    score += pontosNome;
    console.log(`+${pontosNome} pontos do nome (${letrasNome} letras)`);

    // regra 2: soma dos dígitos do telefone
    const somaTelefone = somaDigitosTelefone(cliente.telefone);
    const pontosTelefone = somaTelefone * 5;
    score += pontosTelefone;
    console.log(`+${pontosTelefone} pontos do telefone (${somaTelefone} soma)`);

    // regra 3: excesso de consultas no dia
    const hoje = dayjs().format("YYYY-MM-DD");
    const consultasHoje = await pool.query(
      `SELECT COUNT(*) AS total FROM score_consultas 
       WHERE usuario_id = $1 AND DATE(data_consulta) = $2`,
      [usuarioId, hoje]
    );
    const consultasDia = parseInt(consultasHoje.rows[0].total, 10);
    console.log("Consultas hoje:", consultasDia);

    const ultimaConsultaValidaRes = await pool.query(
      `SELECT MAX(data_consulta) AS ultima_data FROM (
         SELECT data_consulta
         FROM score_consultas
         WHERE usuario_id = $1
         GROUP BY DATE(data_consulta), data_consulta
         HAVING COUNT(*) <= 10
       ) AS sub`,
      [usuarioId]
    );
    const ultimaConsultaValida = ultimaConsultaValidaRes.rows[0].ultima_data;
    let passouUmDia = true;
    if (ultimaConsultaValida) {
      passouUmDia = dayjs().isAfter(dayjs(ultimaConsultaValida).add(1, 'day'));
    }

    if (consultasDia > 10 && !passouUmDia) {
      const excesso = consultasDia - 10;
      const penalidadeConsulta = excesso * 30;
      score = Math.max(0, score - penalidadeConsulta);
      console.log(`-${penalidadeConsulta} pontos por excesso de consultas (${excesso} acima do limite)`);
    }

    // regra 4: ajuste final pelo último dígito
    const ultimoDigito = score % 10;
    if ([1, 3, 5, 7, 9].includes(ultimoDigito)) {
      const penalidade = ultimoDigito * 10;
      score = Math.max(0, score - penalidade);
      console.log(`-${penalidade} pontos por último dígito ímpar (${ultimoDigito})`);
    } else {
      const bonus = ultimoDigito * 10;
      score = Math.min(1000, score + bonus);
      console.log(`+${bonus} pontos por último dígito par (${ultimoDigito})`);
    }

    // limitar entre 0 e 1000
    score = Math.min(1000, Math.max(0, score));
    console.log("Score final:", score);

    // verificar inadimplente
    const scoreBaixoRes = await pool.query(
      "SELECT COUNT(*) AS count FROM score_consultas WHERE usuario_id = $1 AND score < 400",
      [usuarioId]
    );
    const inadimplente =
      !usuario.ultimo_login ||
      parseInt(scoreBaixoRes.rows[0].count, 10) >= 3;

    // atualizar status
    await pool.query(
      "UPDATE usuarios SET inadimplente = $1 WHERE id = $2",
      [inadimplente, usuarioId]
    );

    // salvar a consulta
    await pool.query(
      `INSERT INTO score_consultas (
         usuario_id, cpf_cnpj_consultado, score, data_consulta, cliente_id, tipo_evento
       ) VALUES ($1, $2, $3, NOW(), $4, $5)`,
      [usuarioId, cpf_cnpj, score, clienteId, 'consulta']
    );

    return res.json({ score, inadimplente });
  } catch (err) {
    console.error("Erro ao calcular score:", err);
    return res.status(500).json({ error: "Erro ao calcular score." });
  }
};

exports.historicoScore = async (req, res) => {
  const { cpf_cnpj } = req.params;

  try {
    const resultado = await pool.query(
      `SELECT score, data_consulta 
       FROM score_consultas 
       WHERE cpf_cnpj_consultado = $1 
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
