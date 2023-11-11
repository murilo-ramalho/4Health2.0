const conn = require('../config/db');

class MedicoModel {

    async getAll(){
        const [medico] = await conn.execute('SELECT * FROM medico WHERE situacao = "ativo"');
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
        const query = `UPDATE medico SET ${Object.keys(mod).map(key => `${key} = ?`).join(', ')} WHERE id = ?`;
        const values = [...Object.values(mod), id];
        const [medico] = await conn.execute(query, values);
        return medico;
    }

    async delete(id){
        const [paciente] = await conn.execute(`DELETE FROM medico WHERE id = ${id}`);
        return paciente;
    }

    async inativar(id){
        const [paciente] = await conn.execute(`UPDATE medico SET situacao = "inativo" WHERE id = ${id}`);
        return paciente;
    }

    async reativar(id){
        const [paciente] = await conn.execute(`UPDATE medico SET situacao = "ativo" WHERE id = ${id}`);
        return paciente;
    }
}

module.exports = MedicoModel;