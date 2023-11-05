const conn = require('../config/db');

class ConsultaModel {

    async getAll(){
        const [call] = await conn.execute('SELECT * FROM consulta');
        return call;
    }

    async getById(id){
        const [call] = await conn.execute(`SELECT * FROM consulta WHERE id = ${id}`);
        return call;
    }
    
    async inserir(tipo, finalidade, idPaciente, idMedico,dataMarcada,dataRegistrada,detalhes,idMedicamento,situacao){
        const [call] = await conn.execute("INSERT INTO consulta(tipo, finalidade, id_paciente, id_medico,data_marcada,data_registrada,detalhes,id_medicamento,situacao) VALUES (?,?,?,?,?,?,?,?,?)", [tipo, finalidade, idPaciente, idMedico,dataMarcada,dataRegistrada,detalhes,idMedicamento,situacao]);
        return call;
    }

    async update(id, mod){
        const {tipo, finalidade, id_paciente, id_medico, data_marcada, data_registrada, detalhes, id_medicamento, situacao} = mod;
        const [call] = await conn.execute(`UPDATE consulta SET tipo = ?, finalidade = ?, id_paciente = ?, id_medico = ?, data_marcada = ?, data_registrada = ?, detalhes = ?, id_medicamento = ?, situacao = ? WHERE id = ?`, [tipo, finalidade, id_paciente, id_medico, data_marcada, data_registrada, detalhes, id_medicamento, situacao, id]);
        return call;
    }
    
    async delete(id){
        const [call] = await conn.execute(`DELETE FROM consulta WHERE id = ${id}`);
        return call;
    }
}

module.exports = ConsultaModel;