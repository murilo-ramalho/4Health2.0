CREATE database IF NOT EXISTS pegasus;

use pegasus;

DROP TABLE IF EXISTS paciente;
CREATE TABLE IF NOT EXISTS paciente (
    id BIGINT NOT NULL AUTO_INCREMENT,
    cpf BIGINT NOT NULL,
    rg BIGINT NOT NULL,
    nome VARCHAR(40) NOT NULL,
    nascimento DATE NOT NULL,
    sexo CHAR(1) NOT NULL,
    senha VARCHAR(30) NOT NULL,
    situacao VARCHAR(10) NOT NULL,
    problema VARCHAR(30) NOT NULL,
    pcd VARCHAR(30) NOT NULL,
    alergia VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO paciente(cpf,rg,nome,nascimento,sexo,senha,situacao,problema,pcd,alergia) 
VALUES(50320620816,604922630,"murilo ramalho","2003-11-22","m","kkkk","ativo","nenhum","nenhum","nenhum");

DROP TABLE IF EXISTS MEDICO;
CREATE TABLE IF NOT EXISTS medico (
	id BIGINT NOT NULL AUTO_INCREMENT,
	cpf BIGINT NOT NULL,
	rg BIGINT NOT NULL,
	nome VARCHAR(40) NOT NULL,
	nascimento DATE NOT NULL,
	sexo CHAR(1) NOT NULL,
	senha VARCHAR(30) NOT NULL,
	situacao VARCHAR(10) NOT NULL,
    crm BIGINT NOT NULL,
    especialidade VARCHAR(50) NOT NULL,
    horario CHAR(10) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO medico(cpf,rg,nome,nascimento,sexo,senha,situacao,crm,especialidade,horario)
VALUES(19432749382,123456789,"kleber ribeiro","1980-1-1","m","1980","aposentado",123456,"terapeuta","manhã");

DROP TABLE IF EXISTS medicamento;
CREATE TABLE IF NOT EXISTS medicamento (
	id BIGINT NOT NULL AUTO_INCREMENT,
    tipo VARCHAR(20) NOT NULL,
    nome VARCHAR(30) NOT NULL,
    finalidade VARCHAR(30) NOT NULL,
    medida CHAR(10) NOT NULL,
    dosagem INT NOT NULL,
    aplicacao VARCHAR(20) NOT NULL,
    quantidade INT NOT NULL,
    situacao CHAR(10) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO medicamento(tipo,nome,finalidade,medida,dosagem,aplicacao,quantidade,situacao) 
VALUES("comprimido","captopril","hipertensão","mg","25","oral",23,"ativo");

CREATE TABLE IF NOT EXISTS consulta (
    id BIGINT NOT NULL AUTO_INCREMENT,
    tipo CHAR(40) NOT NULL,
    finalidade VARCHAR(40) NOT NULL,
    id_paciente BIGINT NOT NULL,
    id_medico BIGINT NOT NULL,
    data_marcada DATE NOT NULL,
    data_registrada DATE NOT NULL,
    detalhes VARCHAR(50),
    id_medicamento BIGINT NOT NULL,
    situacao VARCHAR(10) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_paciente) REFERENCES paciente(id),
    FOREIGN KEY (id_medico) REFERENCES medico(id),
    FOREIGN KEY (id_medicamento) REFERENCES medicamento(id)
);

