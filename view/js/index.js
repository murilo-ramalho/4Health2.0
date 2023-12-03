document.addEventListener('DOMContentLoaded', function () {
    var cpfSalvo = localStorage.getItem('cpf');
    var senhaSalva = localStorage.getItem('senha');
    if (cpfSalvo && senhaSalva) {
        document.getElementById('mensagemLogado').textContent = `4health, Bem-vindo(a) ${cpfSalvo}`;
    }

    const formConsulta = document.querySelector('#formConsulta');
    const selectMedico = document.querySelector('#selectedMedico');
    const respostaApi = document.querySelector('#respostaApi');

    // Chamar endpoint para obter lista de médicos
    fetch('http://localhost:3000/medicos')
        .then(response => response.json())
        .then(data => {
            // Preencher o dropdown de médicos com os dados retornados
            data.forEach(medico => {
                const option = document.createElement('option');
                option.value = medico.id;
                option.textContent = medico.nome;
                selectMedico.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar médicos:', error);
        });

    formConsulta.addEventListener('submit', function (event) {
        event.preventDefault();

        const cpfDigitado = document.querySelector('#cpfDigitado').value;
        const selectedDate = document.querySelector('#selectedDate').value;
        const selectedMedico = document.querySelector('#selectedMedico').value;
        const detalhes = document.querySelector('#detalhes').value;

        const requestBody = {
            info: {
                tipo: "consulta comum",
                finalidade: null,
                id_paciente: cpfDigitado,
                id_medico: selectedMedico,
                data_marcada: selectedDate,
                data_registrada: new Date().toISOString().split('T')[0],
                detalhes: detalhes,
                id_medicamento: null
            }
        };

        // Enviar agendamento de consulta
        fetch('https://localhost:3000/consulta/inserir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json())
            .then(data => {
                // Exibir mensagem de sucesso ou erro
                respostaApi.textContent = data.status;
            })
            .catch(error => {
                console.error('Erro ao agendar consulta:', error);
            });
    });
});
