CREATE DATABASE clinica;
USE clinica;

CREATE TABLE Medico (
    Id INTEGER PRIMARY KEY,
    Nome VARCHAR(255),
    Especialidade VARCHAR(255)
);

CREATE TABLE Paciente (
    Id INTEGER PRIMARY KEY,
    Nome VARCHAR(255),
    Endereco VARCHAR(255)
);

CREATE TABLE Exame (
    Id INTEGER PRIMARY KEY,
    Tipo VARCHAR(255),
    Aceita_Convenio BOOLEAN,
    Requisitos VARCHAR(255),
    Valor_Exame FLOAT,
    fk_Paciente_Id INTEGER,
    fk_Medico_Id INTEGER
);
 
ALTER TABLE Exame ADD CONSTRAINT FK_Exame_2
    FOREIGN KEY (fk_Paciente_Id)
    REFERENCES Paciente (Id);
 
ALTER TABLE Exame ADD CONSTRAINT FK_Exame_3
    FOREIGN KEY (fk_Medico_Id)
    REFERENCES Medico (Id);

    -- ================================================
--  INSERTS
-- ================================================

-- Medico
INSERT INTO Medico (Id, Nome, Especialidade) VALUES
(1, 'Dr. Carlos Mendes',     'Cardiologia'),
(2, 'Dra. Fernanda Lima',    'Neurologia'),
(3, 'Dr. Roberto Alves',     'Ortopedia'),
(4, 'Dra. Juliana Castro',   'Dermatologia'),
(5, 'Dr. Marcos Pereira',    'Clínica Geral');

-- Paciente
INSERT INTO Paciente (Id, Nome, Endereco) VALUES
(1, 'Ana Paula Souza',    'Rua das Acácias, 12, São Paulo - SP'),
(2, 'Bruno Henrique',     'Av. Central, 340, Campinas - SP'),
(3, 'Carla Dias',         'Rua XV de Novembro, 88, Curitiba - PR'),
(4, 'Diego Martins',      'Av. Atlântica, 500, Rio de Janeiro - RJ'),
(5, 'Elisa Rodrigues',    'Rua das Palmeiras, 77, Belo Horizonte - MG'),
(6, 'Felipe Nascimento',  'Rua Sete de Setembro, 210, Fortaleza - CE');

-- Exame
INSERT INTO Exame (Id, Tipo, Aceita_Convenio, Requisitos, Valor_Exame, fk_Paciente_Id, fk_Medico_Id) VALUES
(1,  'Eletrocardiograma',       TRUE,  'Nenhum',                      150.00, 1, 1),
(2,  'Ressonância Magnética',   FALSE, 'Sem objetos metálicos',        900.00, 2, 2),
(3,  'Raio-X',                  TRUE,  'Retirar adornos metálicos',    120.00, 3, 3),
(4,  'Dermatoscopia',           TRUE,  'Nenhum',                      200.00, 4, 4),
(5,  'Hemograma Completo',      TRUE,  'Jejum de 8 horas',             80.00, 5, 5),
(6,  'Ecocardiograma',          FALSE, 'Nenhum',                      350.00, 6, 1),
(7,  'Tomografia',              TRUE,  'Retirar adornos metálicos',    500.00, 1, 2),
(8,  'Densitometria Óssea',     TRUE,  'Nenhum',                      250.00, 2, 3),
(9,  'Glicemia em Jejum',       TRUE,  'Jejum de 12 horas',            60.00, 3, 5),
(10, 'Teste Ergométrico',       FALSE, 'Roupas confortáveis',          400.00, 4, 1);

-- ================================================
--  SELECTS
-- ================================================

-- 1. Todos os médicos e suas especialidades
SELECT Id, Nome, Especialidade
FROM Medico
ORDER BY Nome;

-- 2. Todos os pacientes cadastrados
SELECT Id, Nome, Endereco
FROM Paciente
ORDER BY Nome;

-- 3. Todos os exames com paciente e médico responsável
SELECT
    e.Id          AS ExameId,
    e.Tipo        AS Exame,
    p.Nome        AS Paciente,
    m.Nome        AS Medico,
    m.Especialidade,
    e.Aceita_Convenio,
    e.Valor_Exame
FROM Exame e
JOIN Paciente p ON e.fk_Paciente_Id = p.Id
JOIN Medico   m ON e.fk_Medico_Id   = m.Id
ORDER BY e.Id;

-- 4. Exames que aceitam convênio
SELECT
    e.Tipo        AS Exame,
    e.Valor_Exame,
    p.Nome        AS Paciente
FROM Exame e
JOIN Paciente p ON e.fk_Paciente_Id = p.Id
WHERE e.Aceita_Convenio = TRUE
ORDER BY e.Valor_Exame;

-- 5. Exames mais caros que R$ 200,00
SELECT
    e.Tipo        AS Exame,
    e.Valor_Exame,
    p.Nome        AS Paciente,
    m.Nome        AS Medico
FROM Exame e
JOIN Paciente p ON e.fk_Paciente_Id = p.Id
JOIN Medico   m ON e.fk_Medico_Id   = m.Id
WHERE e.Valor_Exame > 200.00
ORDER BY e.Valor_Exame DESC;

-- 6. Quantidade de exames por médico
SELECT
    m.Nome        AS Medico,
    m.Especialidade,
    COUNT(e.Id)   AS Total_Exames
FROM Medico m
LEFT JOIN Exame e ON e.fk_Medico_Id = m.Id
GROUP BY m.Id, m.Nome, m.Especialidade
ORDER BY Total_Exames DESC;

-- 7. Valor médio, mínimo e máximo dos exames por médico
SELECT
    m.Nome          AS Medico,
    ROUND(AVG(e.Valor_Exame), 2) AS Valor_Medio,
    MIN(e.Valor_Exame)           AS Valor_Minimo,
    MAX(e.Valor_Exame)           AS Valor_Maximo
FROM Medico m
JOIN Exame e ON e.fk_Medico_Id = m.Id
GROUP BY m.Id, m.Nome
ORDER BY Valor_Medio DESC;

-- 8. Pacientes que têm mais de 1 exame
SELECT
    p.Nome        AS Paciente,
    COUNT(e.Id)   AS Total_Exames
FROM Paciente p
JOIN Exame e ON e.fk_Paciente_Id = p.Id
GROUP BY p.Id, p.Nome
HAVING COUNT(e.Id) > 1
ORDER BY Total_Exames DESC;

-- 9. Exames com requisito de jejum
SELECT
    e.Tipo        AS Exame,
    e.Requisitos,
    e.Valor_Exame,
    p.Nome        AS Paciente
FROM Exame e
JOIN Paciente p ON e.fk_Paciente_Id = p.Id
WHERE e.Requisitos LIKE '%jejum%' OR e.Requisitos LIKE '%Jejum%'
ORDER BY e.Tipo;

-- 10. Receita total gerada por cada médico
SELECT
    m.Nome              AS Medico,
    m.Especialidade,
    SUM(e.Valor_Exame)  AS Receita_Total
FROM Medico m
JOIN Exame e ON e.fk_Medico_Id = m.Id
GROUP BY m.Id, m.Nome, m.Especialidade
ORDER BY Receita_Total DESC;