const PacienteModel = require('../model/PacienteModel');
const access = require('./AccessController');

class PacienteController{

    constructor(req,res){
        this.req = req;
        this.res = res;
        this.PacienteModel = new PacienteModel();
        this.access = new access(req,res);
    }

    async getAll(){
        if (this.access.checkMethodGet() === false) {
            return this.res.status(405).send({'status':'Método não permitido'});
        } else if(await this.access.checkAccess() === false){
            return this.res.status(401).send({'status':'Acesso negado'});
        } else {
            this.res.json(await this.PacienteModel.getAll());
        }
    }

    async getById(){
        if (this.access.checkMethodGet() === false) {
            return this.res.status(405).send({'status':'Método não permitido'});
        } else if(await this.access.checkAccess() === false){
            return this.res.status(401).send({'status':'Acesso negado'});
        } else {
            this.res.json(await this.PacienteModel.getById(this.req.params.id));
        }
    }

    async post(){
        if (this.access.checkMethodPost() === false) {
            return this.res.status(405).send({'status':'Método não permitido'});
        } else if (await this.access.checkPaciente() === false) {
            return this.res.status(400).send({'status':'Dados inválidos'});
        } else{
            let cpf = this.req.body.info.cpf;
            let rg = this.req.body.info.rg;
            let nome = this.req.body.info.nome;
            let nascimento = this.req.body.info.nascimento;
            let sexo = this.req.body.info.sexo;
            let senha = this.req.body.info.senha;
            let situacao = "ativo";
            let problema = this.req.body.info.problema;
            let pcd = this.req.body.info.pcd;
            let alergia = this.req.body.info.alergia;
            let result = await this.PacienteModel.post(cpf,rg,nome,nascimento,sexo,senha,situacao,problema,pcd,alergia)
            if (result.length != 0) {
                this.res.status(201).send({'status':'cadastrado com sucesso'});
            } else {
                this.res.status(400).send({'status':'erro ao cadastrar'});
            }
        }
    }

    async update(){
        if (this.access.checkMethodPatch() === false) {
            return this.res.status(405).send({'status':'Método não permitido'});
        } else if (await this.access.checkAccess() === false) {
            return this.res.status(401).send({'status':'Acesso negado'});
        } else if (await this.access.checkPaciente() === false) {
            return this.res.status(400).send({'status':'Dados inválidos ou faltantes'});
        } else if (await this.access.checkIsPacienteInativo() === true) {
            return this.res.status(400).send({'status':'Paciente inativo, não é possível atualizar'});
        } else {
            let id = this.req.params.id;
            let mod = this.req.body.info;
            let result = await this.PacienteModel.patch(id, mod);
            if( result.length != 0){
                this.res.status(200).send({'status':'atualizado com sucesso'});
            } else {
                this.res.status(400).send({'status':'erro ao atualizar'});
            }
        }
    }
    
    async delete(){
        if (this.access.checkMethodDelete() === false) {
            return this.res.status(405).send({'status':'Método não permitido'});
        } else if (await this.access.checkIsAdmin() === false) {
            return this.res.status(401).send({'status':'Acesso negado'});
        } else {
            let result = await this.PacienteModel.delete(this.req.params.id);
            if (result.affectedRows != 0){
                this.res.status(200).send({'status':'apagado com sucesso'});
            } else {
                this.res.status(400).send({'status':'erro ao apagar'});
            }
        }
    }

    async inativar(){
        if (this.access.checkMethodPatch() === false) {
            return this.res.status(405).send({'status':'Método não permitido'});
        } else if (await this.access.checkAccess() === false) {
            return this.res.status(401).send({'status':'Acesso negado'});
        } else if (await this.access.checkIsPacienteInativo() === true) {
            return this.res.status(400).send({'status':'Paciente inativo, não é possível inativar'});
        } else {
            let result = await this.PacienteModel.inativar(this.req.params.id);
            if (result.affectedRows != 0){
                this.res.status(200).send({'status':'inativado com sucesso'});
            } else {
                this.res.status(400).send({'status':'erro ao inativar'});
            }
        }
    }

    async reativar(){
        if (this.access.checkMethodPatch() === false) {
            return this.res.status(405).send({'status':'Método não permitido'});
        } else if (await this.access.checkAccess() === false) {
            return this.res.status(401).send({'status':'Acesso negado'});
        } else if (await this.access.checkIsPacienteInativo() === false) {
            return this.res.status(400).send({'status':'Paciente ativo, não é possível reativar'});
        } else {
            let result = await this.PacienteModel.reativar(this.req.params.id);
            if (result.affectedRows != 0){
                this.res.status(200).send({'status':'reativado com sucesso'});
            } else {
                this.res.status(400).send({'status':'erro ao reativar'});
            }
        }
    }
}

module.exports = PacienteController;