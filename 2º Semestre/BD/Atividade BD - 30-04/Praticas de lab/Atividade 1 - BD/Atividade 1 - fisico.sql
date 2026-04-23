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


SELECT cliente.nome 'Nome do Cliente', apolice.numero 'Número do Apólice'
  FROM cliente 
 INNER JOIN apolice 
    ON cliente.id = apolice.fk_Cliente_Id;
    
SELECT cliente.nome 'Nome do Cliente', apolice.numero 'Número do Apólice', carro.registro 'Registro do carro', carro.marca 'Marca do carro' 
  FROM cliente
 INNER JOIN apolice
	ON cliente.id = apolice.fk_Cliente_Id
 INNER JOIN carro
	ON apolice.fk_Cliente_Id = carro.id;
    
SELECT *
  FROM carro
 INNER JOIN acidentes
	ON carro.id = acidentes.fk_Carro_Id
 WHERE carro.marca = 'Toyota';
 
 SELECT *
   FROM carro
   LEFT JOIN acidentes
     ON carro.id = acidentes.fk_Carro_Id;
 
 SELECT cliente.nome 'Nome do Cliente', apolice.numero 'Número do Apólice', apolice.valor 'Valor da Apólice', carro.registro 'Registro do carro', carro.marca 'Marca do carro' 
  FROM cliente
 INNER JOIN apolice
	ON cliente.id = apolice.fk_Cliente_Id
 INNER JOIN carro
	ON apolice.fk_Cliente_Id = carro.id;