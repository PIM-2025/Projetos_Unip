CREATE DATABASE consultorio;
USE consultorio;

CREATE TABLE Medico (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(150),
    especialidade VARCHAR(150),
    crm VARCHAR(6)
);

CREATE TABLE Paciente (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(150),
    dataNascimento DATE,
    sexo VARCHAR(100),
    convenio VARCHAR(100),
    estadoCivil VARCHAR(100),
    rg VARCHAR(9),
    telefone VARCHAR(11),
    endereco VARCHAR(150)
);

CREATE TABLE Exame (
    data DATE,
    resultado VARCHAR(150),
    exame VARCHAR(150),
    fk_Consulta_id INTEGER
);

CREATE TABLE Consulta (
    id INTEGER PRIMARY KEY,
    dataConsulta DATE,
    diagnostico VARCHAR(150),
    fk_Paciente_id INTEGER,
    fk_Medico_id INTEGER
);
 
ALTER TABLE Exame ADD CONSTRAINT FK_Exame_1
    FOREIGN KEY (fk_Consulta_id)
    REFERENCES Consulta (id)
    ON DELETE CASCADE;
 
ALTER TABLE Consulta ADD CONSTRAINT FK_Consulta_2
    FOREIGN KEY (fk_Paciente_id)
    REFERENCES Paciente (id)
    ON DELETE CASCADE;
 
ALTER TABLE Consulta ADD CONSTRAINT FK_Consulta_3
    FOREIGN KEY (fk_Medico_id)
    REFERENCES Medico (id)
    ON DELETE CASCADE;