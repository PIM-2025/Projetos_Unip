-- =========================
-- DDL

CREATE DATABASE clinica;
USE clinica;

CREATE TABLE medico (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    especialidade VARCHAR(100)
);

CREATE TABLE paciente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    endereco VARCHAR(150)
);

CREATE TABLE exame (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(100),
    aceita_convenio BOOLEAN,
    requisitos VARCHAR(200),
    valor_exame DECIMAL(10,2)
);

CREATE TABLE realiza (
    fk_medico_id INT,
    fk_exame_id INT,

    PRIMARY KEY (fk_medico_id, fk_exame_id),

    FOREIGN KEY (fk_medico_id) REFERENCES medico(id)
    ON DELETE CASCADE,

    FOREIGN KEY (fk_exame_id) REFERENCES exame(id)
    ON DELETE CASCADE
);

CREATE TABLE tem (
    fk_paciente_id INT,
    fk_exame_id INT,

    PRIMARY KEY (fk_paciente_id, fk_exame_id),

    FOREIGN KEY (fk_paciente_id) REFERENCES paciente(id)
    ON DELETE CASCADE,

    FOREIGN KEY (fk_exame_id) REFERENCES exame(id)
    ON DELETE CASCADE
);

-- =========================
-- DML

INSERT INTO medico (nome, especialidade)
VALUES 
('Dr. João', 'Cardiologia'),
('Dra. Maria', 'Ortopedia');

INSERT INTO paciente (nome, endereco)
VALUES 
('Carlos', 'Rua A'),
('Ana', 'Rua B');

INSERT INTO exame (tipo, aceita_convenio, requisitos, valor_exame)
VALUES 
('Raio-X', TRUE, 'Jejum de 8h', 200.00),
('Sangue', TRUE, 'Nenhum', 100.00);

INSERT INTO realiza (fk_medico_id, fk_exame_id)
VALUES 
(1, 1),
(2, 2);

INSERT INTO tem (fk_paciente_id, fk_exame_id)
VALUES 
(1, 1),
(2, 2);

-- =========================
-- DQL

SELECT * FROM medico;

SELECT * FROM paciente;

SELECT * FROM exame;

SELECT m.nome AS medico, e.tipo AS exame
FROM realiza r
JOIN medico m ON r.fk_medico_id = m.id
JOIN exame e ON r.fk_exame_id = e.id;

SELECT p.nome AS paciente, e.tipo AS exame
FROM tem t
JOIN paciente p ON t.fk_paciente_id = p.id
JOIN exame e ON t.fk_exame_id = e.id;

SELECT * FROM exame
WHERE valor_exame > 150;