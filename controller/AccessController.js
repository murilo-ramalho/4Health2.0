const conn = require('../config/db');

class AccessMiddleware {
    constructor(res, req) {
        this.res = res;
        this.req = req;
    }

    //requisições
    checkMethodGet() {
        if (this.req.method != 'GET') {
            return false;
        }
    }
    checkMethodPost() {
        if (this.req.method !== 'POST') {
            return false;
        }
    }
    checkMethodPatch() {
        if (this.req.method !== 'PATCH') {
            return false;
        }
    }
    checkMethodDelete() {
        if (this.req.method !== 'DELETE') {
            return false;
        }
    }

    //acesso geral
    async checkAccess() {
        let user = this.req.body.access.user;
        let pass = this.req.body.access.pass;
        if (user === undefined || pass === undefined) {
            return false;
        } else if (user == "" || pass == "") {
            return false;
        } else {
            const [call] = await conn.execute('SELECT * FROM paciente WHERE cpf = ? AND senha = ?', [user, pass]);
            if (call.length === 0 && await this.checkIsAdmin() === false || call.length === 0 && await this.checkIsAdmin() === true) {
                return true;
            }
        }
    }
    
    //se tiver inativo
    async checkIsPacienteInativo(){
        let user = this.req.body.access.user;
        let pass = this.req.body.access.pass;
        const [call] = await conn.execute('SELECT * FROM paciente WHERE cpf = ? AND senha = ?', [user, pass]);
        if (call[0].situacao === 'inativo') {
            return true;
        }
    }
    async checkIsMedicoInativo(){
        let user = this.req.body.access.user;
        let pass = this.req.body.access.pass;
        const [call] = await conn.execute('SELECT * FROM medico WHERE cpf = ? AND senha = ?', [user, pass]);
        if (call[0].situacao === 'inativo') {
            return true;
        }
    }

    //dados faltando
    checkPaciente(){
        let cpf = this.req.body.info.cpf;
        let rg = this.req.body.info.rg;
        let nome = this.req.body.info.nome;
        let senha = this.req.body.info.senha;
        if (cpf === undefined || rg === undefined || nome === undefined || senha === undefined) {
            return false;
        } else if (cpf == "" || rg == "" || nome == "" || senha == "") {
            return false;
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
            return false;
        } else if (cpf == "" || rg == "" || nome == "" || senha == "" || crm == "" || especialidade == "") {
            return false;
        }
    }

    //se for admin
    async checkIsAdmin(){
        let user = this.req.body.access.user;
        let pass = this.req.body.access.pass;
        const [call] = await conn.execute('SELECT * FROM admin WHERE user = ? AND pass = ?', [user, pass]);
        if (call.length === 0) {
            return false;
        }
    }
}

module.exports = AccessMiddleware;