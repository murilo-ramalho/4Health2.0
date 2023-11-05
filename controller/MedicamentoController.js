const medicamentoModel = require('../model/MedicamentoModel');

class MedicamentoController {

    constructor(req,res) {
        this.req = req;
        this.res = res;
        this.medicamentoModel = new medicamentoModel();
    }

    async getAll(){
        this.res.json(await this.medicamentoModel.getAll());
    }

    async getById(){
        this.res.json(await this.medicamentoModel.getById(this.req.params.id));
    }

    async inserir(){
        let tipo = this.req.body.tipo;
        let nome = this.req.body.nome;
        let finalidade = this.req.body.finalidade;
        let medida = this.req.body.medida;
        let dosagem = this.req.body.dosagem;
        let aplicacao = this.req.body.aplicacao;
        let quantidade = this.req.body.quantidade;
        let situacao = this.req.body.situacao;
        let result = await this.medicamentoModel.inserir(tipo,nome,finalidade,medida,dosagem,aplicacao,quantidade,situacao);
        if (result.length != 0){
            this.res.status(200).send({'status':'successo ao cadastrar'});
        } else {
            this.res.status(400).send({'status':'erro ao cadastrar'});
        }
    }

    async update(){
        let id = await this.req.params.id;
        let result = await this.medicamentoModel.update(id, this.req.body);
        if (result.length != 0){
            this.res.status(200).send({'status':'successo ao atualizar'});
        } else {
            this.res.status(400).send({'status':'erro ao atualizar'});
        }
    }

    async delete(){
        let result = await this.medicamentoModel.delete(this.req.params.id);
        if (result.affectedRows != 0){
            this.res.status(200).send({'status':'apagado com sucesso'});
        } else {
            this.res.status(400).send({'status':'erro ao apagar'});
        }
    }
}

module.exports = MedicamentoController;