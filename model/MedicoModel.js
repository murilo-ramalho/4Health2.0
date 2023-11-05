const conn = require('../config/db');

class MedicoModel {

    async getAll(){
        const [medico] = await conn.execute('SELECT * FROM medico');
        return medico;
    }

    async getById(id){
        const [medico] = await conn.execute('SELECT * FROM medico WHERE id = ?', [id]);
        return medico;
    }

    async insert(cpf,rg,nome,nascimento,sexo,senha,situacao,crm,especialidade,horario){
        const [medico] = await conn.execute('INSERT INTO medico(cpf,rg,nome,nascimento,sexo,senha,situacao,crm,especialidade,horario) VALUES (?,?,?,?,?,?,?,?,?,?)', [cpf,rg,nome,nascimento,sexo,senha,situacao,crm,especialidade,horario]);
        return medico;
    }

    async update(id, mod){
        const {cpf,rg,nome,nascimento,sexo,senha,situacao,problema,pcd,alergia,crm,especialidade,horario} = mod;
        const [medico] = await conn.execute('UPDATE medico SET cpf = ?, rg = ?, nome = ?, nascimento = ?, sexo = ?, senha = ?, situacao = ?, crm = ?, especialidade = ?, horario = ? WHERE id = ?', [cpf,rg,nome,nascimento,sexo,senha,situacao,crm,especialidade,horario,id]);
        return medico;
    }

    async delete(id){
        const [paciente] = await conn.execute(`DELETE FROM medico WHERE id = ${id}`);
        return paciente;
    }
}

module.exports = MedicoModel;