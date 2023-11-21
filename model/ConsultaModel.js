const conn = require('../config/db');

class ConsultaModel {

    async getAll(){
        const [call] = await conn.execute('SELECT * FROM consulta WHERE situacao = "ativo"');
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

    async update(id, mod) {
        const columnsToUpdate = Object.keys(mod);
        const updateValues = Object.values(mod);
        const setClause = columnsToUpdate.map(column => `${column} = ?`).join(', ');
    
        const query = `UPDATE consulta SET ${setClause} WHERE id = ?`;
        const values = [...updateValues, id];
    
        const [call] = await conn.execute(query, values);
        return call;
    }
    
    
    async delete(id){
        const [call] = await conn.execute(`DELETE FROM consulta WHERE id = ${id}`);
        return call;
    }

    async consultaMedico(id){
        const [call] = await conn.execute(`SELECT * FROM consulta WHERE id_medico = ${id}`);
        return call;
    }

    async consultaPaciente(id){
        const [call] = await conn.execute(`SELECT * FROM consulta WHERE id_paciente = ${id}`);
        return call;
    }
    
    async consultaDia(data){
        const [call] = await conn.execute(`SELECT * FROM consulta WHERE data_marcada = "${data}"`);
        return call;
    }
}

module.exports = ConsultaModel;