const conn = require('../config/db');

class PacienteModel {

    async getAll(){
        const [pacientes] = await conn.execute('SELECT * FROM paciente');
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
        const query = "UPDATE paciente SET cpf = ?, rg = ?, nome = ?, nascimento = ?, sexo = ?, senha = ?, situacao = ?, problema = ?, pcd = ?, alergia = ? WHERE id = ?";
        const {cpf,rg,nome,nascimento,sexo,senha,situacao,problema,pcd,alergia} = mod;

        const [paciente] = await conn.execute(query, [cpf,rg,nome,nascimento,sexo,senha,situacao,problema,pcd,alergia, id]);
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