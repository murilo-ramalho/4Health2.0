const e = require('express');
const MedicoModel = require('../model/MedicoModel');
const AccessController = require('./AccessController'); 

class MedicoController {

    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.MedicoModel = new MedicoModel();
        this.access = new AccessController(req, res);
    }

    async getAll(){
        if (this.access.checkMethodGet() == false){
            return this.res.status(405).send({'status':'Método não permitido'});
        } else if (await this.access.checkAccess() === false){
            return this.res.status(401).send({'status':'Acesso negado'});
        } else {
            this.res.json(await this.MedicoModel.getAll());
        }
    }

    async getById(){
        if (this.access.checkMethodGet() === false){
            return this.res.status(405).send({'status':'Método não permitido'});
        } else if (this.access.checkAccess() === false){
            return this.res.status(401).send({'status':'Acesso negado'});
        } else {
            this.res.json(await this.MedicoModel.getById(this.req.params.id));
        }
    }

    async insert(){
        if (this.access.checkMethodPost() === false){
            return this.res.status(405).send({'status':'Método não permitido'});
        } else if (this.access.checkPaciente() === false){
            return this.res.status(401).send({'status':'Dados Invalidos'});
        } else {
            let cpf = this.req.body.info.cpf;
            let rg = this.req.body.info.rg;
            let nome = this.req.body.info.nome;
            let nascimento = this.req.body.info.nascimento;
            let sexo = this.req.body.info.sexo;
            let senha = this.req.body.info.senha;
            let situacao = this.req.body.info.situacao;
            let crm = this.req.body.info.crm;
            let especialidade = this.req.body.info.especialidade;
            let horario = this.req.body.info.horario;
            let result = await this.MedicoModel.insert(cpf,rg,nome,nascimento,sexo,senha,situacao,crm,especialidade,horario);
            if (result.lenght != 0) {
                this.res.status(201).send({'status':'sucesso ao cadastrar'});
            } else {
                this.res.status(400).send({'status': 'erro ao cadastrar'});
            }
        }
    }

    async update(){
        if (this.access.checkMethodPatch() === false){
            return this.res.status(405).send({'status':'Método não permitido'});
        } else if (this.access.checkIsAdmin() === false){
            return this.res.status(401).send({'status':'Acesso negado'});
        } else if (this.access.checkIsMedicoInativo() === true){
            return this.res.status(401).send({'status':'Médico inativo, não pode ser atualizado'});
        } else if (this.access.checkMedico() === false){
            return this.res.status(401).send({'status':'Dados Invalidos'});
        } else {
            let id = this.req.params.id;
            let result = await this.MedicoModel.update(id,this.req.body);
            if (result.lenght != 0) {
                this.res.status(200).send({'status':'sucesso ao atualizar'});
            } else {
                this.res.status(400).send({'status':'erro ao atualizar'});
            }
        }
    }

    async delete(){
        if (this.access.checkMethodDelete() === false){
            return this.res.status(405).send({'status':'Método não permitido'});
        } else if (this.access.checkAccess() === false){
            return this.res.status(401).send({'status':'Acesso negado'});
        } else {
            let result = await this.MedicoModel.delete(this.req.params.id);
            if (result.affectedRows != 0) {
                this.res.status(200).send({'status':'sucesso ao apagar'});
            } else {
                this.res.status(400).send({'status':'erro ao apagar'});
            }
        }
    }

    async inativar(){
        if (this.access.checkMethodPatch() === false){
            return this.res.status(405).send({'status':'Método não permitido'});
        } else if (this.access.checkIsAdmin() === false){
            return this.res.status(401).send({'status':'Acesso negado'});
        } else if (this.access.checkIsMedicoInativo() === true){
            return this.res.status(401).send({'status':'Médico já inativo'});
        } else {
            let id = this.req.params.id;
            let result = await this.MedicoModel.inativar(id);
            if (result.lenght != 0) {
                this.res.status(200).send({'status':'sucesso ao inativar'});
            } else {
                this.res.status(400).send({'status':'erro ao inativar'});
            }
        }
    }

    async reativar(){
        if (this.access.checkMethodPatch() === false){
            return this.res.status(405).send({'status':'Método não permitido'});
        } else if (this.access.checkIsAdmin() === false){
            return this.res.status(401).send({'status':'Acesso negado'});
        } else if (this.access.checkIsMedicoInativo() === false){
            return this.res.status(401).send({'status':'Médico já ativo'});
        } else {
            let id = this.req.params.id;
            let result = await this.MedicoModel.reativar(id);
            if (result.lenght != 0) {
                this.res.status(200).send({'status':'sucesso ao reativar'});
            } else {
                this.res.status(400).send({'status':'erro ao reativar'});
            }
        }
    }
}

module.exports = MedicoController;