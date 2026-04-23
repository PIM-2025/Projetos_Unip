-- =========================
-- DDL

CREATE DATABASE vendas;
USE vendas;

CREATE TABLE vendedor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    endereco VARCHAR(255),
    comissao DECIMAL(5,2)
);

CREATE TABLE cliente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    endereco VARCHAR(255),
    fat_acumulado DECIMAL(12,2),
    lim_credito DECIMAL(12,2),

    fk_vendedor_id INT,
    FOREIGN KEY (fk_vendedor_id) REFERENCES vendedor(id)
);

CREATE TABLE estoque (
    id INT PRIMARY KEY AUTO_INCREMENT,
    endereco VARCHAR(255)
);

CREATE TABLE peca (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(100),
    preco DECIMAL(10,2),
    qtd_estoque INT,

    fk_estoque_id INT,
    FOREIGN KEY (fk_estoque_id) REFERENCES estoque(id)
);

CREATE TABLE pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data DATE,

    fk_cliente_id INT,
    fk_vendedor_id INT,

    FOREIGN KEY (fk_cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (fk_vendedor_id) REFERENCES vendedor(id)
);

CREATE TABLE item_pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    quantidade INT,
    preco_cotado DECIMAL(10,2),

    fk_pedido_id INT,
    fk_peca_id INT,

    FOREIGN KEY (fk_pedido_id) REFERENCES pedido(id),
    FOREIGN KEY (fk_peca_id) REFERENCES peca(id)
);

-- =========================
-- DML

INSERT INTO vendedor (nome, endereco, comissao)
VALUES 
('Carlos', 'Rua A', 10.50),
('Fernanda', 'Rua B', 12.00);

INSERT INTO cliente (nome, endereco, fat_acumulado, lim_credito, fk_vendedor_id)
VALUES 
('João', 'Av Central', 5000.00, 10000.00, 1),
('Maria', 'Rua X', 2000.00, 8000.00, 2);

INSERT INTO estoque (endereco)
VALUES 
('Galpão 1'),
('Galpão 2');

INSERT INTO peca (descricao, preco, qtd_estoque, fk_estoque_id)
VALUES 
('Parafuso', 2.50, 100, 1),
('Porca', 1.50, 200, 2);

INSERT INTO pedido (data, fk_cliente_id, fk_vendedor_id)
VALUES 
('2024-01-10', 1, 1),
('2024-02-15', 2, 2);

INSERT INTO item_pedido (quantidade, preco_cotado, fk_pedido_id, fk_peca_id)
VALUES 
(10, 2.50, 1, 1),
(20, 1.50, 2, 2);

-- =========================
-- DQL

SELECT * FROM vendedor;

SELECT c.nome AS cliente, v.nome AS vendedor
FROM cliente c
JOIN vendedor v ON c.fk_vendedor_id = v.id;

SELECT p.id, p.data, c.nome AS cliente, v.nome AS vendedor
FROM pedido p
JOIN cliente c ON p.fk_cliente_id = c.id
JOIN vendedor v ON p.fk_vendedor_id = v.id;

SELECT ip.id, ip.quantidade, ip.preco_cotado, pe.descricao
FROM item_pedido ip
JOIN peca pe ON ip.fk_peca_id = pe.id;

SELECT p.id AS pedido,
       SUM(ip.quantidade * ip.preco_cotado) AS total
FROM pedido p
JOIN item_pedido ip ON p.id = ip.fk_pedido_id
GROUP BY p.id;