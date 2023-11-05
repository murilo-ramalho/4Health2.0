const MedicoModel = require('../model/MedicoModel');

class MedicoController {

    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.MedicoModel = new MedicoModel();
    }

    async getAll(){
        this.res.json(await this.MedicoModel.getAll());
    }

    async getById(){
        this.res.json(await this.MedicoModel.getById(this.req.params.id));
    }

    async insert(){
        let cpf = this.req.body.cpf;
        let rg = this.req.body.rg;
        let nome = this.req.body.nome;
        let nascimento = this.req.body.nascimento;
        let sexo = this.req.body.sexo;
        let senha = this.req.body.senha;
        let situacao = this.req.body.situacao;
        let crm = this.req.body.crm;
        let especialidade = this.req.body.especialidade;
        let horario = this.req.body.horario;
        let result = await this.MedicoModel.insert(cpf,rg,nome,nascimento,sexo,senha,situacao,crm,especialidade,horario);
        if (result.lenght != 0) {
            this.res.status(200).send({'status':'sucesso ao cadastrar'});
        } else {
            this.res.status(400).send({'status': 'erro ao cadastrar'});
        }
    }

    async update(){
        let id = this.req.params.id;
        let result = await this.MedicoModel.update(id,this.req.body);
        if (result.lenght != 0) {
            this.res.status(200).send({'status':'sucesso ao atualizar'});
        } else {
            this.res.status(400).send({'status':'erro ao atualizar'});
        }
    }

    async delete(){
        let result = await this.MedicoModel.delete(this.req.params.id);
        if (result.affectedRows != 0) {
            this.res.status(200).send({'status':'sucesso ao apagar'});
        } else {
            this.res.status(400).send({'status':'erro ao apagar'});
        }
    }
}

module.exports = MedicoController;