document.addEventListener('DOMContentLoaded', function () {
    // Script de login não alterado

    // Script de cadastro modificado para exibir a resposta JSON
    const formCadastro = document.querySelector('#formCadastro');
    const mensagemCadastro = document.querySelector('#mensagemCadastro');

    formCadastro.addEventListener('submit', async function (event) {
        event.preventDefault();

        const cpf = document.querySelector('#cpf').value;
        const rg = document.querySelector('#rg').value;
        const nome = document.querySelector('#nome').value;
        const nascimento = document.querySelector('#nascimento').value;
        const sexo = document.querySelector('#sexo').value;
        const senha = document.querySelector('#senha').value;
        const problema = document.querySelector('#problema').value;
        const pcd = document.querySelector('#pcd').value;
        const alergia = document.querySelector('#alergia').value;

        const requestBody = {
            info: {
                cpf,
                rg,
                nome,
                nascimento,
                sexo,
                senha,
                problema,
                pcd,
                alergia
            }
        };

        try {
            const response = await fetch('http://localhost:8000/paciente/cadastrar/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            // Exibe a mensagem do JSON na tela
            mensagemCadastro.textContent = data.status;

            if (response.ok) {
                // Cadastro bem-sucedido, armazenar CPF e senha na sessionStorage
                sessionStorage.setItem('cpf', cpf);
                sessionStorage.setItem('senha', senha);
            }

        } catch (error) {
            console.error('Erro:', error);
        }
    });
});
