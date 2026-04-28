CREATE DATABASE seguradora;
USE seguradora;

CREATE TABLE Cliente (
    Numero VARCHAR(11),
    Nome VARCHAR(100),
    Endereco VARCHAR(100),
    Id INTEGER PRIMARY KEY
);

CREATE TABLE Apolice (
    Numero VARCHAR(11),
    Valor FLOAT,
    Id INTEGER,
    fk_Cliente_Id INTEGER,
    fk_Carro_Id INTEGER,
    PRIMARY KEY (Id, fk_Cliente_Id, fk_Carro_Id)
);

CREATE TABLE Carro (
    Registro INTEGER,
    Marca VARCHAR(50),
    Id INTEGER PRIMARY KEY
);

CREATE TABLE Acidentes (
    Data DATE,
    Hora TIME,
    Local VARCHAR(100),
    Id INTEGER,
    fk_Carro_Id INTEGER,
    PRIMARY KEY (Id, fk_Carro_Id)
);
 
ALTER TABLE Apolice ADD CONSTRAINT FK_Apolice_2
    FOREIGN KEY (fk_Cliente_Id)
    REFERENCES Cliente (Id);
 
ALTER TABLE Apolice ADD CONSTRAINT FK_Apolice_3
    FOREIGN KEY (fk_Carro_Id)
    REFERENCES Carro (Id);
 
ALTER TABLE Acidentes ADD CONSTRAINT FK_Acidentes_2
    FOREIGN KEY (fk_Carro_Id)
    REFERENCES Carro (Id);


-- Inserts para Cliente
INSERT INTO Cliente (Id, Numero, Nome, Endereco) VALUES
(1, '11122233344', 'Ana Silva', 'Rua das Flores, 123, São Paulo - SP'),
(2, '22233344455', 'Bruno Oliveira', 'Av. Paulista, 456, São Paulo - SP'),
(3, '33344455566', 'Carla Souza', 'Rua XV de Novembro, 789, Curitiba - PR'),
(4, '44455566677', 'Diego Ferreira', 'Rua Sete de Setembro, 321, Rio de Janeiro - RJ'),
(5, '55566677788', 'Elena Costa', 'Av. Brasil, 654, Belo Horizonte - MG');

-- Inserts para Carro
INSERT INTO Carro (Id, Registro, Marca) VALUES
(1, 20181001, 'Toyota'),
(2, 20190502, 'Honda'),
(3, 20200703, 'Volkswagen'),
(4, 20171204, 'Ford'),
(5, 20211505, 'Chevrolet'),
(6, 2018118, 'Byd');

-- Inserts para Apolice
INSERT INTO Apolice (Id, Numero, Valor, fk_Cliente_Id, fk_Carro_Id) VALUES
(1, 'AP0000001', 1500.00, 1, 1),
(2, 'AP0000002', 2300.50, 2, 2),
(3, 'AP0000003', 1800.75, 3, 3),
(4, 'AP0000004', 3200.00, 4, 4),
(5, 'AP0000005', 2750.90, 5, 5),
(6, 'AP0000006', 1950.00, 1, 3);

-- Inserts para Acidentes
INSERT INTO Acidentes (Id, Data, Hora, Local, fk_Carro_Id) VALUES
(1, '2023-03-15', '08:30:00', 'Av. Paulista, São Paulo - SP', 1),
(2, '2023-06-22', '14:45:00', 'Rua da Consolação, São Paulo - SP', 2),
(3, '2023-09-10', '19:00:00', 'BR-116, Curitiba - PR', 3),
(4, '2024-01-05', '07:15:00', 'Av. Rio Branco, Rio de Janeiro - RJ', 4),
(5, '2024-04-18', '22:30:00', 'Contorno, Belo Horizonte - MG', 5),
(6, '2024-07-30', '11:00:00', 'Av. Ipiranga, São Paulo - SP', 1);

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