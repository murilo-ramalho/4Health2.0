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
        } else if (await this.access.checkIsAdmin() === false) {
            return this.res.status(401).send({'status':'acesso negado'});
        } else {
            this.res.json(await this.ConsultaModel.getAll());
        }
    }

    async getById(){
        if (this.access.checkMethodGet() === false) {
            return this.res.status(405).send({'status':'método nao permitido'});
        } else if (await this.access.checkIsAdmin() === false) {
            return this.res.status(401).send({'status':'acesso negado'});
        } else {
            this.res.json(await this.ConsultaModel.getById(this.req.params.id));
        }
    }

    async inserir(){
        if (this.access.checkMethodPost() === false) {
            return this.res.status(405).send({'status':'método nao permitido'});
        } else if (await this.access.checkIsPacienteInativo(this.req.body.access.user) === true) {
            return this.res.status(400).send({'status':'paciente inativo'});
        } else if (await this.access.checkIsMedicoInativo(this.req.body.info.id_medico) === true) {
            return this.res.status(400).send({'status':'médico inativo'});
        } else {
            let tipo = this.req.body.info.tipo;
            let finalidade = this.req.body.info.finalidade;
            let idPaciente = this.req.body.info.id_paciente;
            let idMedico = this.req.body.info.id_medico;
            let dataMarcada = this.req.body.info.data_marcada;
            let dataRegistrada = this.req.body.info.data_registrada;
            let detalhes = this.req.body.info.detalhes;
            let idMedicamento = this.req.body.info.id_medicamento;
            let situacao = "ativo";
            let result = await this.ConsultaModel.inserir(tipo, finalidade, idPaciente, idMedico, dataMarcada, dataRegistrada, detalhes, idMedicamento, situacao);
            if (result.length != 0){
                this.res.status(201).send({'status':'sucesso ao cadastrar'});
            } else {
                this.res.status(400).send({'status':'erro ao cadastrar'});
            }
        }
    }

    async update(){
        if (this.access.checkMethodPatch() === false) {
            return this.res.status(405).send({'status':'método nao permitido'});
        } else if (await this.access.checkAccess() === false) {
            return this.res.status(401).send({'status':'acesso negado'});
        } else {
            let id = this.req.params.id;
            let mod = this.req.body.info;
            let result = await this.ConsultaModel.update(id, mod);
            if (result.length != 0){
                this.res.status(200).send({'status':'sucesso ao atualizar'});
            } else {
                this.res.status(400).send({'status':'erro ao atualizar'});
            }
        }
    }

    async delete(){
        if (this.access.checkMethodDelete() === false) {
            return this.res.status(405).send({'status':'método nao permitido'});
        } else if (await this.access.checkAccess() === false) {
            return this.res.status(401).send({'status':'acesso negado'});
        } else {
            let result = await this.ConsultaModel.delete(this.req.params.id);
            if (result.affectedRows != 0){
                this.res.status(200).send({'status':'sucesso ao apagar'});
            } else {
                this.res.status(400).send({'status':'erro ao apagar'});
            }
        }
    }

    async consultaMedico(){
        if (this.access.checkMethodGet() === false) {
            return this.res.status(405).send({'status':'método nao permitido'});
        } else if (await this.access.checkAccess() === false) {
            return this.res.status(401).send({'status':'acesso negado'});
        } else {
            let id = this.req.params.id;
            let result = await this.ConsultaModel.consultaMedico(id);
            if (result.length != 0){
                this.res.status(200).send(result);
            } else {
                this.res.status(400).send({'status':'erro ao consultar'});
            }
        }
    }

    async consultaPaciente(){
        if (this.access.checkMethodGet() === false) {
            return this.res.status(405).send({'status':'método nao permitido'});
        } else if (await this.access.checkAccess() === false) {
            return this.res.status(401).send({'status':'acesso negado'});
        } else {
            let id = this.req.params.id;
            let result = await this.ConsultaModel.consultaPaciente(id);
            if (result.length != 0){
                this.res.status(200).send(result);
            } else {
                this.res.status(400).send({'status':'erro ao consultar'});
            }
        }
    }

    async consultaDia(){
        if (this.access.checkMethodGet() === false) {
            return this.res.status(405).send({'status':'método nao permitido'});
        } else if (await this.access.checkAccess() === false) {
            return this.res.status(401).send({'status':'acesso negado'});
        } else {
            let data = this.req.params.data;
            let result = await this.ConsultaModel.consultaDia(data);
            if (result.length != 0){
                this.res.status(200).send(result);
            } else {
                this.res.status(400).send({'status':'erro ao consultar'});
            }
        }
    }
}

module.exports = ConsultaController;
