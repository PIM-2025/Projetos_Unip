-- =========================
-- DDL

CREATE DATABASE empresa;
USE empresa;

CREATE TABLE departamento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setor VARCHAR(100)
);

CREATE TABLE funcionario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    salario DECIMAL(10,2),
    telefone VARCHAR(20),
    fk_departamento_id INT,

    FOREIGN KEY (fk_departamento_id) REFERENCES departamento(id)
    ON DELETE CASCADE
);

CREATE TABLE projeto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    orcamento DECIMAL(10,2)
);

CREATE TABLE pecas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    peso DECIMAL(10,2),
    cor VARCHAR(50)
);

CREATE TABLE fornecedor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    endereco VARCHAR(150)
);

CREATE TABLE deposito (
    id INT PRIMARY KEY AUTO_INCREMENT,
    endereco VARCHAR(150)
);

CREATE TABLE participa (
    fk_funcionario_id INT,
    fk_projeto_id INT,
    dt_inicio DATE,
    hrs_trabal INT,

    PRIMARY KEY (fk_funcionario_id, fk_projeto_id),

    FOREIGN KEY (fk_funcionario_id) REFERENCES funcionario(id)
    ON DELETE CASCADE,

    FOREIGN KEY (fk_projeto_id) REFERENCES projeto(id)
    ON DELETE CASCADE
);

CREATE TABLE utiliza (
    fk_pecas_id INT,
    fk_projeto_id INT,

    PRIMARY KEY (fk_pecas_id, fk_projeto_id),

    FOREIGN KEY (fk_pecas_id) REFERENCES pecas(id)
    ON DELETE CASCADE,

    FOREIGN KEY (fk_projeto_id) REFERENCES projeto(id)
    ON DELETE CASCADE
);

CREATE TABLE fornece (
    fk_pecas_id INT,
    fk_fornecedor_id INT,

    PRIMARY KEY (fk_pecas_id, fk_fornecedor_id),

    FOREIGN KEY (fk_pecas_id) REFERENCES pecas(id)
    ON DELETE CASCADE,

    FOREIGN KEY (fk_fornecedor_id) REFERENCES fornecedor(id)
    ON DELETE CASCADE
);

CREATE TABLE fornecedor_projeto (
    fk_fornecedor_id INT,
    fk_projeto_id INT,

    PRIMARY KEY (fk_fornecedor_id, fk_projeto_id),

    FOREIGN KEY (fk_fornecedor_id) REFERENCES fornecedor(id)
    ON DELETE CASCADE,

    FOREIGN KEY (fk_projeto_id) REFERENCES projeto(id)
    ON DELETE CASCADE
);

CREATE TABLE estoca (
    fk_pecas_id INT,
    fk_deposito_id INT,

    PRIMARY KEY (fk_pecas_id, fk_deposito_id),

    FOREIGN KEY (fk_pecas_id) REFERENCES pecas(id)
    ON DELETE CASCADE,

    FOREIGN KEY (fk_deposito_id) REFERENCES deposito(id)
    ON DELETE CASCADE
);

-- =========================
-- DML

INSERT INTO departamento (setor)
VALUES ('TI'), ('RH');

INSERT INTO funcionario (salario, telefone, fk_departamento_id)
VALUES 
(3000.00, '11999999999', 1),
(4500.00, '11888888888', 2);

INSERT INTO projeto (orcamento)
VALUES 
(10000.00),
(20000.00);

INSERT INTO pecas (peso, cor)
VALUES 
(2.5, 'Preto'),
(1.2, 'Branco');

INSERT INTO fornecedor (endereco)
VALUES 
('Rua X'),
('Rua Y');

INSERT INTO deposito (endereco)
VALUES 
('Galpão A'),
('Galpão B');

INSERT INTO participa (fk_funcionario_id, fk_projeto_id, dt_inicio, hrs_trabal)
VALUES 
(1, 1, '2024-01-01', 40),
(2, 2, '2024-02-01', 60);

INSERT INTO utiliza (fk_pecas_id, fk_projeto_id)
VALUES 
(1, 1),
(2, 2);

INSERT INTO fornece (fk_pecas_id, fk_fornecedor_id)
VALUES 
(1, 1),
(2, 2);

INSERT INTO fornecedor_projeto (fk_fornecedor_id, fk_projeto_id)
VALUES 
(1, 1),
(2, 2);

INSERT INTO estoca (fk_pecas_id, fk_deposito_id)
VALUES 
(1, 1),
(2, 2);

-- =========================
-- DQL

SELECT f.id, f.salario, d.setor
FROM funcionario f
JOIN departamento d ON f.fk_departamento_id = d.id;

SELECT f.id, p.id AS projeto
FROM participa pa
JOIN funcionario f ON pa.fk_funcionario_id = f.id
JOIN projeto p ON pa.fk_projeto_id = p.id;

SELECT p.id AS projeto, pe.cor
FROM utiliza u
JOIN projeto p ON u.fk_projeto_id = p.id
JOIN pecas pe ON u.fk_pecas_id = pe.id;

SELECT pe.id, fo.endereco
FROM fornece f
JOIN pecas pe ON f.fk_pecas_id = pe.id
JOIN fornecedor fo ON f.fk_fornecedor_id = fo.id;

SELECT pe.id, d.endereco
FROM estoca e
JOIN pecas pe ON e.fk_pecas_id = pe.id
JOIN deposito d ON e.fk_deposito_id = d.id;