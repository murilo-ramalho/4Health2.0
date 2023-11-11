const ConsultaModel = require('../model/ConsultaModel');
const AccessController = require('./AccessController');

class ConsultaController {

    constructor(req, res){
        this.req = req;
        this.res = res;
        this.ConsultaModel = new ConsultaModel();
        this.access = new AccessController(req, res);
    }

    async getAll(){
        if (this.access.checkMethodGet() === false) {
            return this.res.status(405).send({'status':'método nao permitido'});
        } else if (await this.access.checkAccess() === false) {
            return this.res.status(401).send({'status':'acesso negado'});
        } else {
            this.res.json(await this.ConsultaModel.getAll());
        }
    }

    async getById(){
        this.res.json(await this.ConsultaModel.getById(this.req.params.id));
    }

    async inserir(){
        let tipo = this.req.body.tipo;
        let finalidade = this.req.body.finalidade;
        let idPaciente = this.req.body.id_paciente;
        let idMedico = this.req.body.id_medico;
        let dataMarcada = this.req.body.data_marcada;
        let dataRegistrada = this.req.body.data_registrada;
        let detalhes = this.req.body.detalhes;
        let idMedicamento = this.req.body.id_medicamento;
        let situacao = this.req.body.situacao;
        let result = await this.ConsultaModel.inserir(tipo, finalidade, idPaciente, idMedico, dataMarcada, dataRegistrada, detalhes, idMedicamento, situacao);
        if (result.length != 0){
            this.res.status(200).send({'status':'sucesso ao cadastrar'});
        } else {
            this.res.status(400).send({'status':'erro ao cadastrar'});
        }
    }

    async update(){
        let id = this.req.params.id;
        let result = await this.ConsultaModel.update(id, this.req.body);
        if (result.length != 0){
            this.res.status(200).send({'status':'sucesso ao atualizar'});
        } else {
            this.res.status(400).send({'status':'erro ao atualizar'});
        }
    }

    async delete(){
        let result = await this.ConsultaModel.delete(this.req.params.id);
        if (result.affectedRows != 0){
            this.res.status(200).send({'status':'sucesso ao apagar'});
        } else {
            this.res.status(400).send({'status':'erro ao apagar'});
        }
    }

    async consultaMedico(){
        let id = this.req.params.id;
        let result = await this.ConsultaModel.consultaMedico(id);
        if (result.length != 0){
            this.res.status(200).send(result);
        } else {
            this.res.status(400).send({'status':'erro ao consultar'});
        }
    }

    async consultaPaciente(){
        let id = this.req.params.id;
        let result = await this.ConsultaModel.consultaPaciente(id);
        if (result.length != 0){
            this.res.status(200).send(result);
        } else {
            this.res.status(400).send({'status':'erro ao consultar'});
        }
    }
}

module.exports = ConsultaController;
