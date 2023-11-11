const e = require('express');
const conn = require('../config/db');

class AccessMiddleware {
    constructor(req, res) {
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
        const isAdmin = await this.checkIsAdmin();

        const [callPaciente] = await conn.execute('SELECT * FROM paciente WHERE cpf = ? AND senha = ?', [user, pass]);

        if (callPaciente.length > 0 && callPaciente[0].situacao !== 'inativo') {
            return true;
        }
        if (user === undefined || pass === undefined || user === "" || pass === "") {
            return false;
        }
        if (isAdmin) {
            return true;
        }

        return false;
    }
    
    //se tiver inativo
    async checkIsPacienteInativo(){
        let id = this.req.params.id;
        const [call] = await conn.execute('SELECT situacao FROM paciente WHERE id = ?', [id]);
        if (call[0].situacao === 'inativo') {
            return true;
        }
    }
    async checkIsMedicoInativo(){
        let id = this.req.params.id;
        const [call] = await conn.execute('SELECT situacao FROM medico WHERE id', [id]);
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
    
        const [callAdmin] = await conn.execute('SELECT * FROM admin WHERE user = ? AND pass = ?', [user, pass]);
    
        return callAdmin.length > 0;
    }
}

module.exports = AccessMiddleware;