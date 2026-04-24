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
-- Listar todos os exames e seus respectivos pacientes
SELECT paciente.nome 'Nome do Paciente', exame.tipo 'Tipo do Exame'
  FROM paciente
 INNER JOIN exame
    ON paciente.id = exame.fk_Paciente_Id;

-- Listar todos os exames e o médico responsável
SELECT medico.nome 'Nome do Médico', medico.especialidade 'Especialidade', exame.tipo 'Tipo do Exame'
  FROM medico
 INNER JOIN exame
    ON medico.id = exame.fk_Medico_Id;

-- Relatório geral: Paciente -> Exame -> Médico
SELECT paciente.nome 'Nome do Paciente', exame.tipo 'Tipo do Exame', exame.valor_exame 'Valor do Exame', medico.nome 'Nome do Médico', medico.especialidade 'Especialidade'
  FROM paciente
 INNER JOIN exame
    ON paciente.id = exame.fk_Paciente_Id
 INNER JOIN medico
    ON exame.fk_Medico_Id = medico.id;

-- Listar exames de um médico específico (pela especialidade)
SELECT medico.nome 'Nome do Médico', exame.tipo 'Tipo do Exame', paciente.nome 'Nome do Paciente'
  FROM medico
 INNER JOIN exame
    ON medico.id = exame.fk_Medico_Id
 INNER JOIN paciente
    ON exame.fk_Paciente_Id = paciente.id
 WHERE medico.especialidade = 'Cardiologia';

-- Listar todos os médicos e seus exames (mesmo os que não têm exames)
SELECT medico.nome 'Nome do Médico', medico.especialidade 'Especialidade', exame.tipo 'Tipo do Exame'
  FROM medico
  LEFT JOIN exame
    ON medico.id = exame.fk_Medico_Id;

-- Listar apenas os exames que aceitam convênio
SELECT paciente.nome 'Nome do Paciente', exame.tipo 'Tipo do Exame', exame.valor_exame 'Valor do Exame'
  FROM paciente
 INNER JOIN exame
    ON paciente.id = exame.fk_Paciente_Id
 WHERE exame.aceita_convenio = TRUE;

-- Listar exames de um paciente específico (pelo nome)
SELECT paciente.nome 'Nome do Paciente', exame.tipo 'Tipo do Exame', exame.valor_exame 'Valor do Exame', exame.requisitos 'Requisitos'
  FROM paciente
 INNER JOIN exame
    ON paciente.id = exame.fk_Paciente_Id
 WHERE paciente.nome = 'Ana Paula Souza';