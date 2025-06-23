CREATE DATABASE IF NOT EXISTS serasa;
USE serasa;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cpf_cnpj VARCHAR(20) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  tipo ENUM('admin', 'usuario') NOT NULL
);

CREATE TABLE cadastros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cpf_cnpj VARCHAR(20) UNIQUE NOT NULL,
  data_nascimento DATE NOT NULL,
  usuario_id INT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE score (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cadastro_id INT,
  valor INT,
  data_calculo DATE,
  FOREIGN KEY (cadastro_id) REFERENCES cadastros(id)
);
