CREATE DATABASE loja;
USE loja;

CREATE TABLE Vendedor (
    Id INTEGER PRIMARY KEY,
    Nome VARCHAR(255),
    Endereco VARCHAR(255),
    Comissao DECIMAL(10, 2)
);

CREATE TABLE Pedido (
    Id INTEGER PRIMARY KEY,
    Data DATE,
    fk_Cliente_Id INTEGER,
    fk_Vendedor_Id INTEGER
);

CREATE TABLE Cliente (
    Id INTEGER PRIMARY KEY,
    Nome VARCHAR(255),
    Lim_Credito DECIMAL(10, 2),
    Endereco VARCHAR(255),
    Fat_Acumulado DECIMAL(10, 2),
    fk_Vendedor_Id INTEGER
);

CREATE TABLE Estoque (
    Id INTEGER PRIMARY KEY,
    Endereco VARCHAR(255)
);

CREATE TABLE Item_Pedido (
    Id INTEGER PRIMARY KEY,
    Quantidade INTEGER,
    Preco DECIMAL(10, 2),
    fk_Pedido_Id INTEGER,
    fk_Peca_Id INTEGER
);

CREATE TABLE Peca (
    Id INTEGER PRIMARY KEY,
    Descricao VARCHAR(255),
    Preco DECIMAL(10, 2),
    Estoque INTEGER,
    fk_Estoque_Id INTEGER
);
 
ALTER TABLE Pedido ADD CONSTRAINT FK_Pedido_2
    FOREIGN KEY (fk_Cliente_Id)
    REFERENCES Cliente (Id);
 
ALTER TABLE Pedido ADD CONSTRAINT FK_Pedido_3
    FOREIGN KEY (fk_Vendedor_Id)
    REFERENCES Vendedor (Id);
 
ALTER TABLE Cliente ADD CONSTRAINT FK_Cliente_2
    FOREIGN KEY (fk_Vendedor_Id)
    REFERENCES Vendedor (Id);
 
ALTER TABLE Item_Pedido ADD CONSTRAINT FK_Item_Pedido_2
    FOREIGN KEY (fk_Pedido_Id)
    REFERENCES Pedido (Id);
 
ALTER TABLE Item_Pedido ADD CONSTRAINT FK_Item_Pedido_3
    FOREIGN KEY (fk_Peca_Id)
    REFERENCES Peca (Id);
 
ALTER TABLE Peca ADD CONSTRAINT FK_Peca_2
    FOREIGN KEY (fk_Estoque_Id)
    REFERENCES Estoque (Id);

-- ================================================
--  INSERTS
-- Vendedor
INSERT INTO Vendedor (Id, Nome, Endereco, Comissao) VALUES
(1, 'Ricardo Alves',    'Rua das Palmeiras, 10, São Paulo - SP',   0.05),
(2, 'Patrícia Lima',   'Av. Central, 200, Campinas - SP',          0.07),
(3, 'Fernando Costa',  'Rua XV de Novembro, 55, Curitiba - PR',    0.06),
(4, 'Juliana Melo',    'Av. Atlântica, 310, Rio de Janeiro - RJ',  0.08);

-- Estoque
INSERT INTO Estoque (Id, Endereco) VALUES
(1, 'Galpão A - Av. Industrial, 100, Guarulhos - SP'),
(2, 'Galpão B - Rodovia Anhanguera, Km 80, Campinas - SP'),
(3, 'Galpão C - Rua Logística, 500, Curitiba - PR');

-- Cliente
INSERT INTO Cliente (Id, Nome, Lim_Credito, Endereco, Fat_Acumulado, fk_Vendedor_Id) VALUES
(1, 'Construtora Alpha',   50000.00, 'Rua da Construção, 88, São Paulo - SP',    12000.00, 1),
(2, 'Oficina Beta',        30000.00, 'Av. das Indústrias, 45, ABC - SP',          8500.00, 1),
(3, 'Metalúrgica Gama',    80000.00, 'Rua do Ferro, 210, Belo Horizonte - MG',   31000.00, 2),
(4, 'Fábrica Delta',       20000.00, 'Av. Brasil, 99, Curitiba - PR',             5000.00, 3),
(5, 'Distribuidora Épsilon',60000.00,'Rua do Comércio, 321, Rio de Janeiro - RJ',22000.00, 4);

-- Peca
INSERT INTO Peca (Id, Descricao, Preco, Estoque, fk_Estoque_Id) VALUES
(1, 'Parafuso M8',        2.50,  500, 1),
(2, 'Porca M8',           1.80,  800, 1),
(3, 'Chapa de Aço 3mm',  45.00,  120, 2),
(4, 'Tubo PVC 50mm',     18.00,  300, 2),
(5, 'Rebite 4mm',         0.90, 1000, 3),
(6, 'Perfil Alumínio',   75.00,   60, 3);

-- Pedido
INSERT INTO Pedido (Id, Data, fk_Cliente_Id, fk_Vendedor_Id) VALUES
(1, '2024-02-10', 1, 1),
(2, '2024-02-15', 2, 1),
(3, '2024-03-01', 3, 2),
(4, '2024-03-18', 4, 3),
(5, '2024-04-05', 5, 4),
(6, '2024-04-20', 1, 2);

-- Item_Pedido
INSERT INTO Item_Pedido (Id, Quantidade, Preco, fk_Pedido_Id, fk_Peca_Id) VALUES
(1,  100,  2.50, 1, 1),
(2,   50, 45.00, 1, 3),
(3,  200,  1.80, 2, 2),
(4,   30, 18.00, 2, 4),
(5,  500,  0.90, 3, 5),
(6,   10, 75.00, 3, 6),
(7,   80,  2.50, 4, 1),
(8,   40, 45.00, 5, 3),
(9,  150,  1.80, 5, 2),
(10,  20, 75.00, 6, 6);


-- ================================================
--  SELECTS
-- Listar todos os clientes e o vendedor responsável
SELECT vendedor.nome 'Vendedor', cliente.nome 'Cliente', cliente.lim_credito 'Limite de Crédito', cliente.fat_acumulado 'Faturamento Acumulado'
  FROM cliente
 INNER JOIN vendedor
    ON cliente.fk_Vendedor_Id = vendedor.id;

-- Listar todos os pedidos com o cliente e o vendedor
SELECT pedido.id 'ID do Pedido', pedido.data 'Data', cliente.nome 'Cliente', vendedor.nome 'Vendedor'
  FROM pedido
 INNER JOIN cliente
    ON pedido.fk_Cliente_Id = cliente.id
 INNER JOIN vendedor
    ON pedido.fk_Vendedor_Id = vendedor.id;

-- Listar os itens de cada pedido com a peça correspondente
SELECT pedido.id 'ID do Pedido', pedido.data 'Data', peca.descricao 'Peça', item_pedido.quantidade 'Quantidade', item_pedido.preco 'Preço Unitário'
  FROM pedido
 INNER JOIN item_pedido
    ON pedido.id = item_pedido.fk_Pedido_Id
 INNER JOIN peca
    ON item_pedido.fk_Peca_Id = peca.id;

-- Relatório geral: Cliente -> Pedido -> Peça -> Vendedor
SELECT cliente.nome 'Cliente', pedido.data 'Data do Pedido', peca.descricao 'Peça', item_pedido.quantidade 'Quantidade', item_pedido.preco 'Preço', vendedor.nome 'Vendedor'
  FROM pedido
 INNER JOIN cliente
    ON pedido.fk_Cliente_Id = cliente.id
 INNER JOIN vendedor
    ON pedido.fk_Vendedor_Id = vendedor.id
 INNER JOIN item_pedido
    ON pedido.id = item_pedido.fk_Pedido_Id
 INNER JOIN peca
    ON item_pedido.fk_Peca_Id = peca.id;

-- Listar as peças e em qual estoque estão armazenadas
SELECT peca.descricao 'Peça', peca.preco 'Preço', peca.estoque 'Qtd. em Estoque', estoque.endereco 'Endereço do Estoque'
  FROM peca
 INNER JOIN estoque
    ON peca.fk_Estoque_Id = estoque.id;

-- Listar pedidos de um cliente específico
SELECT pedido.id 'ID do Pedido', pedido.data 'Data', vendedor.nome 'Vendedor', peca.descricao 'Peça', item_pedido.quantidade 'Quantidade'
  FROM pedido
 INNER JOIN cliente
    ON pedido.fk_Cliente_Id = cliente.id
 INNER JOIN vendedor
    ON pedido.fk_Vendedor_Id = vendedor.id
 INNER JOIN item_pedido
    ON pedido.id = item_pedido.fk_Pedido_Id
 INNER JOIN peca
    ON item_pedido.fk_Peca_Id = peca.id
 WHERE cliente.nome = 'Construtora Alpha';

-- Listar todos os vendedores e seus pedidos (mesmo sem pedidos)
SELECT vendedor.nome 'Vendedor', pedido.id 'ID do Pedido', pedido.data 'Data do Pedido'
  FROM vendedor
  LEFT JOIN pedido
    ON vendedor.id = pedido.fk_Vendedor_Id;

-- Listar pedidos realizados em um período específico
SELECT pedido.id 'ID do Pedido', pedido.data 'Data', cliente.nome 'Cliente', vendedor.nome 'Vendedor'
  FROM pedido
 INNER JOIN cliente
    ON pedido.fk_Cliente_Id = cliente.id
 INNER JOIN vendedor
    ON pedido.fk_Vendedor_Id = vendedor.id
 WHERE pedido.data BETWEEN '2024-02-01' AND '2024-03-31';