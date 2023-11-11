const conn = require('../config/db');

class PacienteModel {

    async getAll(){
        const [pacientes] = await conn.execute('SELECT * FROM paciente WHERE situacao = "ativo"');
        return pacientes;
    }

    async getById(id){
        const [paciente] = await conn.execute('SELECT * FROM paciente WHERE id = ?', [id]);
        return paciente;
    }

    async post(cpf,rg,nome,nascimento,sexo,senha,situacao,problema,pcd,alergia){
        const [paciente] = await conn.execute('INSERT INTO paciente(cpf,rg,nome,nascimento,sexo,senha,situacao,problema,pcd,alergia) VALUES(?,?,?,?,?,?,?,?,?,?)', [cpf,rg,nome,nascimento,sexo,senha,situacao,problema,pcd,alergia]);
        return paciente;
    }

    async patch(id, mod){
        const query = `UPDATE paciente SET ${Object.keys(mod).map(key => `${key} = ?`).join(', ')} WHERE id = ?`;
        const values = [...Object.values(mod), id];

        const [paciente] = await conn.execute(query, values);
        return paciente;
    }

    async delete(id){
        const [paciente] = await conn.execute(`DELETE FROM paciente WHERE id = ${id}`);
        return paciente;
    }

    async inativar(id){
        const [paciente] = await conn.execute(`UPDATE paciente SET situacao = 'inativo' WHERE id = ${id}`);
        return paciente;
    }

    async reativar(id){
        const [paciente] = await conn.execute(`UPDATE paciente SET situacao = 'ativo' WHERE id = ${id}`);
        return paciente;
    }
}

module.exports = PacienteModel;