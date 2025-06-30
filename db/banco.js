const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'serasa_db',
});

pool.connect()
  .then(() => console.log("🟢 Conectado ao PostgreSQL com sucesso!"))
  .catch((err) => console.error("🔴 Erro ao conectar ao PostgreSQL:", err));

module.exports = pool;
