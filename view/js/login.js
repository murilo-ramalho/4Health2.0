function getCredentials() {
    const cpf = sessionStorage.getItem('cpf');
    const senha = sessionStorage.getItem('senha');
    return { cpf, senha };
}