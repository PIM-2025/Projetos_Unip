CREATE DATABASE empresa;
USE empresa;

CREATE TABLE Funcionario (
    Id INTEGER PRIMARY KEY,
    Salario FLOAT,
    Telefone VARCHAR(255),
    fk_Departamento_Id INTEGER
);

CREATE TABLE Projeto (
    Id INTEGER PRIMARY KEY,
    Orcamento FLOAT
);

CREATE TABLE Pecas (
    Id INTEGER PRIMARY KEY,
    Peso FLOAT,
    Cor VARCHAR(255)
);

CREATE TABLE Fornecedor (
    Id INTEGER PRIMARY KEY,
    Endereco VARCHAR(255)
);

CREATE TABLE Departamento (
    Id INTEGER PRIMARY KEY,
    Setor VARCHAR(255)
);

CREATE TABLE Deposito (
    Id INTEGER PRIMARY KEY,
    Endereco VARCHAR
);

CREATE TABLE Funcionario_Projeto (
    fk_Funcionario_Id INTEGER,
    fk_Projeto_Id INTEGER,
    Dt_Inicio DATE,
    Hrs_Trabal INTEGER
);

CREATE TABLE Projeto_Fornecedor (
    fk_Fornecedor_Id INTEGER,
    fk_Projeto_Id INTEGER
);

CREATE TABLE Deposito_Pecas (
    fk_Pecas_Id INTEGER,
    fk_Deposito_Id INTEGER
);

CREATE TABLE Projeto_Pecas (
    fk_Projeto_Id INTEGER,
    fk_Pecas_Id INTEGER
);

CREATE TABLE Fornecedor_Pecas (
    fk_Fornecedor_Id INTEGER,
    fk_Pecas_Id INTEGER
);
 
ALTER TABLE Funcionario ADD CONSTRAINT FK_Funcionario_2
    FOREIGN KEY (fk_Departamento_Id)
    REFERENCES Departamento (Id)
    ON DELETE CASCADE;
 
ALTER TABLE Funcionario_Projeto ADD CONSTRAINT FK_Funcionario_Projeto_1
    FOREIGN KEY (fk_Funcionario_Id)
    REFERENCES Funcionario (Id)
    ON DELETE SET NULL;
 
ALTER TABLE Funcionario_Projeto ADD CONSTRAINT FK_Funcionario_Projeto_2
    FOREIGN KEY (fk_Projeto_Id)
    REFERENCES Projeto (Id)
    ON DELETE SET NULL;
 
ALTER TABLE Projeto_Fornecedor ADD CONSTRAINT FK_Projeto_Fornecedor_1
    FOREIGN KEY (fk_Fornecedor_Id)
    REFERENCES Fornecedor (Id)
    ON DELETE SET NULL;
 
ALTER TABLE Projeto_Fornecedor ADD CONSTRAINT FK_Projeto_Fornecedor_2
    FOREIGN KEY (fk_Projeto_Id)
    REFERENCES Projeto (Id)
    ON DELETE SET NULL;
 
ALTER TABLE Deposito_Pecas ADD CONSTRAINT FK_Deposito_Pecas_1
    FOREIGN KEY (fk_Pecas_Id)
    REFERENCES Pecas (Id)
    ON DELETE SET NULL;
 
ALTER TABLE Deposito_Pecas ADD CONSTRAINT FK_Deposito_Pecas_2
    FOREIGN KEY (fk_Deposito_Id)
    REFERENCES Deposito (Id)
    ON DELETE SET NULL;
 
ALTER TABLE Projeto_Pecas ADD CONSTRAINT FK_Projeto_Pecas_1
    FOREIGN KEY (fk_Projeto_Id)
    REFERENCES Projeto (Id);
 
ALTER TABLE Projeto_Pecas ADD CONSTRAINT FK_Projeto_Pecas_2
    FOREIGN KEY (fk_Pecas_Id)
    REFERENCES Pecas (Id);
 
ALTER TABLE Fornecedor_Pecas ADD CONSTRAINT FK_Fornecedor_Pecas_1
    FOREIGN KEY (fk_Fornecedor_Id)
    REFERENCES Fornecedor (Id);
 
ALTER TABLE Fornecedor_Pecas ADD CONSTRAINT FK_Fornecedor_Pecas_2
    FOREIGN KEY (fk_Pecas_Id)
    REFERENCES Pecas (Id);

-- ================================================
--  INSERTS
-- Departamento
INSERT INTO Departamento (Id, Setor) VALUES
(1, 'Tecnologia'),
(2, 'Financeiro'),
(3, 'Recursos Humanos'),
(4, 'Logística'),
(5, 'Marketing');

-- Funcionario
INSERT INTO Funcionario (Id, Salario, Telefone, fk_Departamento_Id) VALUES
(1, 5200.00, '(11) 91234-5678', 1),
(2, 4800.00, '(11) 92345-6789', 1),
(3, 6100.00, '(21) 93456-7890', 2),
(4, 3900.00, '(31) 94567-8901', 3),
(5, 4500.00, '(41) 95678-9012', 4),
(6, 7200.00, '(85) 96789-0123', 5);

-- Projeto
INSERT INTO Projeto (Id, Orcamento) VALUES
(1, 150000.00),
(2, 320000.00),
(3,  80000.00),
(4, 500000.00);

-- Pecas
INSERT INTO Pecas (Id, Peso, Cor) VALUES
(1,  2.50, 'Vermelho'),
(2,  0.75, 'Azul'),
(3,  5.00, 'Verde'),
(4, 12.30, 'Preto'),
(5,  3.10, 'Branco');

-- Fornecedor
INSERT INTO Fornecedor (Id, Endereco) VALUES
(1, 'Rua das Indústrias, 100, São Paulo - SP'),
(2, 'Av. Comercial, 250, Curitiba - PR'),
(3, 'Rua do Porto, 400, Santos - SP');

-- Deposito
INSERT INTO Deposito (Id, Endereco) VALUES
(1, 'Galpão A - Rodovia Anhanguera, Km 50'),
(2, 'Galpão B - Av. Industrial, 900, Campinas - SP'),
(3, 'Galpão C - Rua Logística, 33, Guarulhos - SP');

-- Funcionario_Projeto
INSERT INTO Funcionario_Projeto (fk_Funcionario_Id, fk_Projeto_Id, Dt_Inicio, Hrs_Trabal) VALUES
(1, 1, '2024-01-10', 160),
(2, 1, '2024-01-15', 120),
(3, 2, '2024-02-01', 200),
(4, 3, '2024-03-05',  80),
(5, 4, '2024-04-10', 180),
(6, 2, '2024-02-20', 140),
(1, 3, '2024-03-10', 100);

-- Projeto_Fornecedor
INSERT INTO Projeto_Fornecedor (fk_Fornecedor_Id, fk_Projeto_Id) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(2, 4);

-- Deposito_Pecas
INSERT INTO Deposito_Pecas (fk_Pecas_Id, fk_Deposito_Id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 3),
(1, 3);

-- Projeto_Pecas
INSERT INTO Projeto_Pecas (fk_Projeto_Id, fk_Pecas_Id) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(4, 1);

-- Fornecedor_Pecas
INSERT INTO Fornecedor_Pecas (fk_Fornecedor_Id, fk_Pecas_Id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(3, 1);


-- ================================================
--  SELECTS
-- Listar todos os funcionários e seus departamentos
SELECT departamento.setor 'Departamento', funcionario.id 'ID', funcionario.salario 'Salário', funcionario.telefone 'Telefone'
  FROM funcionario
 INNER JOIN departamento
    ON funcionario.fk_Departamento_Id = departamento.id;

-- Listar todos os funcionários e os projetos em que trabalham
SELECT funcionario.id 'ID do Funcionário', projeto.id 'ID do Projeto', projeto.orcamento 'Orçamento', funcionario_projeto.dt_inicio 'Data de Início', funcionario_projeto.hrs_trabal 'Horas Trabalhadas'
  FROM funcionario
 INNER JOIN funcionario_projeto
    ON funcionario.id = funcionario_projeto.fk_Funcionario_Id
 INNER JOIN projeto
    ON funcionario_projeto.fk_Projeto_Id = projeto.id;

-- Listar quais fornecedores estão vinculados a cada projeto
SELECT projeto.id 'ID do Projeto', projeto.orcamento 'Orçamento do Projeto', fornecedor.id 'ID do Fornecedor', fornecedor.endereco 'Endereço do Fornecedor'
  FROM projeto
 INNER JOIN projeto_fornecedor
    ON projeto.id = projeto_fornecedor.fk_Projeto_Id
 INNER JOIN fornecedor
    ON projeto_fornecedor.fk_Fornecedor_Id = fornecedor.id;

-- Listar quais peças estão em cada depósito
SELECT deposito.endereco 'Depósito', pecas.id 'ID da Peça', pecas.cor 'Cor', pecas.peso 'Peso (kg)'
  FROM deposito
 INNER JOIN deposito_pecas
    ON deposito.id = deposito_pecas.fk_Deposito_Id
 INNER JOIN pecas
    ON deposito_pecas.fk_Pecas_Id = pecas.id;

-- Listar quais peças cada fornecedor fornece
SELECT fornecedor.endereco 'Fornecedor', pecas.id 'ID da Peça', pecas.cor 'Cor', pecas.peso 'Peso (kg)'
  FROM fornecedor
 INNER JOIN fornecedor_pecas
    ON fornecedor.id = fornecedor_pecas.fk_Fornecedor_Id
 INNER JOIN pecas
    ON fornecedor_pecas.fk_Pecas_Id = pecas.id;

-- Listar quais peças são usadas em cada projeto
SELECT projeto.id 'ID do Projeto', projeto.orcamento 'Orçamento', pecas.id 'ID da Peça', pecas.cor 'Cor', pecas.peso 'Peso (kg)'
  FROM projeto
 INNER JOIN projeto_pecas
    ON projeto.id = projeto_pecas.fk_Projeto_Id
 INNER JOIN pecas
    ON projeto_pecas.fk_Pecas_Id = pecas.id;

-- Listar todos os funcionários de um departamento específico
SELECT departamento.setor 'Departamento', funcionario.id 'ID', funcionario.salario 'Salário'
  FROM funcionario
 INNER JOIN departamento
    ON funcionario.fk_Departamento_Id = departamento.id
 WHERE departamento.setor = 'Tecnologia';

-- Listar todos os funcionários e seus projetos (mesmo sem projeto vinculado)
SELECT funcionario.id 'ID do Funcionário', funcionario_projeto.fk_Projeto_Id 'ID do Projeto', funcionario_projeto.hrs_trabal 'Horas Trabalhadas'
  FROM funcionario
  LEFT JOIN funcionario_projeto
    ON funcionario.id = funcionario_projeto.fk_Funcionario_Id;