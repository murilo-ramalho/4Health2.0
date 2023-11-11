const medicamentoModel = require('../model/MedicamentoModel');
const access = require('./AccessController');

class MedicamentoController {

    constructor(req,res) {
        this.req = req;
        this.res = res;
        this.medicamentoModel = new medicamentoModel();
        this.access = new access(req,res);
    }

    async getAll(){
        if(this.access.checkMethodGet() == false){
            return this.res.status(405).send({'status':'Método não permitido'});
        } else if (await this.access.checkAccess() === false){
            return this.res.status(401).send({'status':'Acesso negado'});
        } else {
            this.res.json(await this.medicamentoModel.getAll());
        }
    }

    async getById(){
        if (this.access.checkMethodGet() == false){
            return this.res.status(405).send({'status':'Método não permitido'});
        } else if (await this.access.checkAccess() === false){
            return this.res.status(401).send({'status':'Acesso negado'});
        } else {
            this.res.json(await this.medicamentoModel.getById(this.req.params.id));
        }
    }

    async inserir(){
        if (this.access.checkMethodPost() == false){
            return this.res.status(405).send({'status':'Método não permitido'});
        } else if (await this.access.checkIsAdmin() === false){
            return this.res.status(401).send({'status':'Acesso negado'});
        } else {
            let tipo = this.req.body.info.tipo;
            let nome = this.req.body.info.nome;
            let finalidade = this.req.body.info.finalidade;
            let medida = this.req.body.info.medida;
            let dosagem = this.req.body.info.dosagem;
            let aplicacao = this.req.body.info.aplicacao;
            let quantidade = this.req.body.info.quantidade;
            let situacao = this.req.body.info.situacao;
            if (quantidade >= 0){
                situacao = 'indisponivel';
            }
            let result = await this.medicamentoModel.inserir(tipo,nome,finalidade,medida,dosagem,aplicacao,quantidade,situacao);
            if (result.length != 0){
                this.res.status(201).send({'status':'successo ao cadastrar'});
            } else {
                this.res.status(400).send({'status':'erro ao cadastrar'});
            }
        }
    }

    async update(){
        if (this.access.checkMethodPatch() == false){
            return this.res.status(405).send({'status':'Método não permitido'});
        } else if (await this.access.checkIsAdmin() === false){
            return this.res.status(401).send({'status':'Acesso negado'});
        } else if (await this.access.checkIsMedicamentoInativo() === true){
            return this.res.status(400).send({'status':'Medicamento inativo'});
        } else{
            let id = await this.req.params.id;
            let result = await this.medicamentoModel.update(id, this.req.body.info);
            if (result.length != 0){
                this.res.status(200).send({'status':'successo ao atualizar'});
            } else {
                this.res.status(400).send({'status':'erro ao atualizar'});
            }
        }
    }

    async delete(){
        if (this.access.checkMethodDelete() == false){
            return this.res.status(405).send({'status':'Método não permitido'});
        } else if (await this.access.checkIsAdmin() === false){
            return this.res.status(401).send({'status':'Acesso negado'});
        } else {
            let result = await this.medicamentoModel.delete(this.req.params.id);
            if (result.affectedRows != 0){
                this.res.status(200).send({'status':'apagado com sucesso'});
            } else {
                this.res.status(400).send({'status':'erro ao apagar'});
            }
        }
    }
}

module.exports = MedicamentoController;