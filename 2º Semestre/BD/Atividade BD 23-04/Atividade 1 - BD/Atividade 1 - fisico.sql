-- =========================
-- DDL

CREATE DATABASE seguradora;
USE seguradora;

CREATE TABLE cliente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    endereco VARCHAR(150),
    numero VARCHAR(10)
);

CREATE TABLE carro (
    id INT PRIMARY KEY AUTO_INCREMENT,
    marca VARCHAR(50),
    registro VARCHAR(50)
);

CREATE TABLE apolice (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero VARCHAR(50),
    valor DECIMAL(10,2),

    fk_cliente_id INT,
    fk_carro_id INT,

    FOREIGN KEY (fk_cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (fk_carro_id) REFERENCES carro(id)
);

CREATE TABLE acidente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data DATE,
    hora TIME,
    local VARCHAR(100),

    fk_carro_id INT,

    FOREIGN KEY (fk_carro_id) REFERENCES carro(id)
);

-- =========================
-- DML

INSERT INTO cliente (nome, endereco, numero)
VALUES 
('João', 'Rua A', '123'),
('Maria', 'Rua B', '456');

INSERT INTO carro (marca, registro)
VALUES 
('Toyota', 'ABC-1234'),
('Honda', 'XYZ-5678');

INSERT INTO apolice (numero, valor, fk_cliente_id, fk_carro_id)
VALUES 
('AP001', 1500.00, 1, 1),
('AP002', 2000.00, 2, 2);

INSERT INTO acidente (data, hora, local, fk_carro_id)
VALUES 
('2024-01-10', '14:30:00', 'Centro', 1),
('2024-02-15', '09:00:00', 'Avenida', 2);

-- =========================
-- DQL

SELECT * FROM cliente;

SELECT * FROM carro;

SELECT c.nome, a.numero, a.valor
FROM cliente c
JOIN apolice a ON c.id = a.fk_cliente_id;

SELECT ca.marca, ac.local, ac.data
FROM carro ca
JOIN acidente ac ON ca.id = ac.fk_carro_id;