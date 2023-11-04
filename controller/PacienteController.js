const PacienteModel = require('../model/PacienteModel');

class PacienteController{

    constructor(req,res){
        this.req = req;
        this.res = res;
        this.PacienteModel = new PacienteModel();
    }

    async getAll(){
        this.res.json(await this.PacienteModel.getAll());
    }

    async getById(){
        this.res.json(await this.PacienteModel.getById(this.req.params.id));
    }

    async post(){
        let cpf = this.req.body.cpf;
        let rg = this.req.body.rg;
        let nome = this.req.body.nome;
        let nascimento = this.req.body.nascimento;
        let sexo = this.req.body.sexo;
        let senha = this.req.body.senha;
        let situacao = this.req.body.situacao;
        let problema = this.req.body.problema;
        let pcd = this.req.body.pcd;
        let alergia = this.req.body.alergia;
        let result = await this.PacienteModel.post(cpf,rg,nome,nascimento,sexo,senha,situacao,problema,pcd,alergia)
        if (result.length != 0) {
            this.res.status(201).send({'status':'cadastrado com sucesso'});
        } else {
            this.res.status(400).send({'status':'erro ao cadastrar'});
        }
    }

    async update(){
        let id = this.req.params.id;
        let result = await this.PacienteModel.patch(id, this.req.body);
        if( result.length != 0){
            this.res.status(200).send({'status':'atualizado com sucesso'});
        } else {
            this.res.status(400).send({'status':'erro ao atualizar'});
        }
    }
    
    async delete(){
        let result = await this.PacienteModel.delete(this.req.params.id);
        if (result.affectedRows != 0){
            this.res.status(200).send({'status':'apagado com sucesso'});
        } else {
            this.res.status(400).send({'status':'erro ao apagar'});
        }
    }
}

module.exports = PacienteController;