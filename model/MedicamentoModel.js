const conn = require('../config/db');

class MedicamentoModel {
    
    async getAll() {
        const[medicamento] = await conn.execute('SELECT * FROM medicamento');
        return medicamento;
    }
    
    async getById(id) {
        const [medicamento] = await conn.execute(`SELECT * FROM Medicamento WHERE id = ${id}`);
        return medicamento;
    }

    async inserir(tipo,nome,finalidade,medida,dosagem,aplicacao,quantidade,situacao){
        const [medicamento] = await conn.execute('INSERT INTO medicamento (tipo,nome,finalidade,medida,dosagem,aplicacao,quantidade,situacao) VALUES(?,?,?,?,?,?,?,?)', [tipo,nome,finalidade,medida,dosagem,aplicacao,quantidade,situacao]);
        return medicamento;
    }
    
    async update(id, mod){
        const {tipo,nome,finalidade,medida,dosagem,aplicacao,quantidade,situacao} = mod;
        const query = `UPDATE medicamento SET tipo = ?, nome = ?, finalidade = ?, medida = ?, dosagem = ?, aplicacao = ?, quantidade = ?, situacao = ? WHERE ${id}`;
        const medicamento = await conn.execute(query, [tipo,nome,finalidade,medida,dosagem,aplicacao,quantidade,situacao]);
        return medicamento;
    }

    async delete(id){
        const [query] = `DELETE FROM medicamento WHERE ${id}`;
        return query;
    }
}

module.exports = MedicamentoModel;