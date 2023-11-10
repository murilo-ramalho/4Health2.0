const conn = require('../config/db');

class AccessMiddleware {
    constructor(res, req) {
        this.res = res;
        this.req = req;
    }

    checkMethodGet() {
        if (this.req.method !== 'GET') {
            return this.res.status(405).send('Método não permitido');
        }
    }

    checkMethodPost() {
        if (this.req.method !== 'POST') {
            return this.res.status(405).send('Método não permitido');
        }
    }

    checkMethodPatch() {
        if (this.req.method !== 'PATCH') {
            return this.res.status(405).send('Método não permitido');
        }
    }

    checkMethodDelete() {
        if (this.req.method !== 'DELETE') {
            return this.res.status(405).send('Método não permitido');
        }
    }

    async checkAccess(user,pass) {
        const [call] = await conn.execute('SELECT * FROM paciente WHERE cpf = ? AND senha = ?', [user, pass]);
        if (call.length === 0) {
            return this.res.status(401).send('Acesso negado');
        }
    }

    checkPaciente(){
        let cpf = this.req.body.info.cpf;
        let rg = this.req.body.info.rg;
        let nome = this.req.body.info.nome;
        let senha = this.req.body.info.senha;
        if (cpf === undefined || rg === undefined || nome === undefined || senha === undefined) {
            return this.res.status(400).send('Dados incompletos');
        } else if (cpf == "" || rg == "" || nome == "" || senha == "") {
            return this.res.status(400).send('Insira os dados corretamente');
        }
    }

    checkMedico(){
        let cpf = this.req.body.info.cpf;
        let rg = this.req.body.info.rg;
        let nome = this.req.body.info.nome;
        let senha = this.req.body.info.senha;
        let crm = this.req.body.info.crm;
        let especialidade = this.req.body.info.especialidade;
        if (cpf === undefined || rg === undefined || nome === undefined || senha === undefined || crm === undefined || especialidade === undefined) {
            return this.res.status(400).send('Dados incompletos');
        } else if (cpf == "" || rg == "" || nome == "" || senha == "" || crm == "" || especialidade == "") {
            return this.res.status(400).send('Insira os dados corretamente');
        }
    }
}

module.exports = AccessMiddleware;