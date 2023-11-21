# 4Health2.0

refazendo com uma nova arquitetura e regras de negócios
4Health2.0 é a nova versão do software, separado o funcionamento em uma api, seu objetivo é registar consultas médicas geral ou especifica e vacinação, facilitando para a população realizar a manutenção da sua saúde

## Como Usar

Autenticação deve ser feita com um aquivo json contendo o acesso com o usuario e a senha **tambem pode ser o administrador**.
O contéudo caso seja cadastro ou atualizar, deve conter todos os dados abaixo:

- Paciente
> cpf, rg, nome, nascimento, sexo, senha, situacao, problema, pcd e alergia
- Médico
> cpf, rg, nome, nascimento, email, sexo, senha, situacao, crm, especialidade e horario
- Medicamento
> tipo, nome, finalidade, medida, dosagem, aplicacao, quantidade e situacao
- Consulta
> tipo, finalidade, id_paciente, id_medico, data_marcada, data_registrada, detalhes, id_medicamento, situacao

## Endpoint e Rotas

Puxa todos que estão ativos:
- GET	{local}/pacientes/
- GET	{local}/médicos/
- GET	{local}/medicamentos/
- GET	{local}/consultas/

Puxa um elemento específico:
- GET	{local}/paciente/:id
- GET	{local}/medico/:id
- GET	{local}/medicamento/:id
- GET	{local}/consulta/:id

Inserir:
- POST	{local}/paciente/cadastrar/
- POST	{local}/medico/cadastrar/
- POST	{local}/medicamento /inserir/
- POST	{local}/consulta/inserir/

Atualizar:
- PATCH	{local}/paciente/atualizar/:id
- PATCH	{local}/medico/atualizar/:id
- PATCH	{local}/medicamento/atualizar/:id
- PATCH	{local}/consulta/atualizar/:id

Apagar:
- DELETE	{local}/paciente/apagar/:id
- DELETE	{local}/medico/apagar/:id
- DELETE	{local}/medicamento/apagar/:id
- DELETE	{local}/consulta/apagar/:id

Funções específicas:
- GET	{local}/consultas/data/:data =>
essa requisição puxa todas as consultas de um dia específico.

- GET	{local}/consultas/paciente/:id =>
essa requisição puxa todas as consultas de um paciente específico.

- GET	{local}/consultas/medico/:id =>
essa requisição puxa todas as consultas de um médico específico.

- PATCH	{local}/paciente/inativar/:id =>
essa requisição inativa um paciente específico.

- PATCH	{local}/medico/inativar/:id =>
essa requisição inativa um médico específico.

- PATCH	{local}/paciente/reativar/:id =>
essa requisição reativa um paciente específico.

- PATCH	{local}/medico/reativar/:id =>
essa requisição reativa um médico específico


## Exemplos Práticos

Exemplo de requisições correta:
- POST	{local}/consulta/inserir/
~~~javascript
{
      “access”: {
            “user”: ”usuario”,
            “pass”: ”1234”
      },
      “info”: {
           “tipo”: ”ortopedia”,
           “finalidade”: ”verificação geral”,
           “id_paciente”: 1,
           “id_medico”: 1,
           “data_marcada”: ”2023-11-12”,
           “data_megistrada”: ”2023-11-10”,
           “detalhes”: ”paciente com dor nas costas”,
           “id_medicamento”: 1
      }
}
~~~
- POST	{local}/paciente/cadastrar/
~~~javascript
{
	"info":{
		"cpf": 11111111111,
		"rg": 111111111,
		"nome": "josé",
		"nascimento": "1980-12-01",
		"sexo": "m",
		"senha": "1234",
		"problema": "nenhum",
		"pcd": "nenhum",
		"alergia": "nenhum"
	}
}
~~~
- POST	{local}/medico/cadastrar/
~~~javascript
{
	"info":{
		"cpf": 19432749389,
		"rg": 123456798,
		"nome": "vacinação",
		"email":"josé@email",
		"nascimento": "1980-01-01",
		"sexo": "m",
		"senha": "1980",
		"crm": 123456,
		"especialidade": "terapeuta",
		"horario": "manhã"
	}
}
~~~
- POST	{local}/medicamento/cadastrar/
~~~javascript
{
		"access":{
			"user":"admin",
			"pass":"admin"
	},
		"info":{
			"tipo": "comprimido",
			"nome": "captopril",
			"finalidade": "comprimido",
			"medida": "mg",
			"dosagem": 25,
			"aplicacao": "oral",
			"quantidade": 33
	}
}
~~~

## Gestão de Erros

>Ainda sem um bom tratamento de erro verdadeiro

a api verifica se o paciente possui o cpf, rg, nome e senha vazios.
a api verifica se o médico possui o cpf, rg, nome, senha, crm e especialidade vazios.

## Exemplos de Respostas

Exemplos de respostas em JSON.
~~~javascript
{
	"status": "successo ao cadastrar"
}
~~~
~~~javascript
{
	"status": "sucesso ao atualizar"
}
~~~
~~~javascript
{
	"status": "sucesso ao apagar"
}
~~~

## Licença

MIT

## Mais informações

- [Documentação da API](./documents/documentação.docx)
- [Requisitos](./documents/Requisitos.docx)
