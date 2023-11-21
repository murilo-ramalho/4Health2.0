# 4Health2.0

refazendo com uma nova arquitetura e regras de negócios
4Health2.0 é a nova versão do software, separado o funcionamento em uma api, seu objetivo é registar consultas médicas geral ou especifica e vacinação, facilitando para a população realizar a manutenção da sua saúde

## Como Usar

Autenticação, exemplos de solicitações, parâmetros e respostas.

## Endpoint e Rotas

Puxa todos que estão ativos:
- GET	   {local}/pacientes/
- GET    {local}/médicos/
- GET	   {local}/medicamentos/
- GET	   {local}/consultas/

Puxa um elemento específico:
- GET    {local}/paciente/:id
- GET	   {local}/medico/:id
- GET	   {local}/medicamento/:id
- GET    {local}/consulta/:id

Inserir:
- POST    {local}/paciente/cadastrar/
- POST	{local}/medico/cadastrar/
- POST	{local}/medicamento /inserir/
- POST	{local}/consulta/inserir/

Atualizar:
- PATCH	{local}/paciente/atualizar/:id
- PATCH	{local}/medico/atualizar/:id
- PATCH	{local}/medicamento/atualizar/:id
- PATCH	{local}/consulta/atualizar/:id

Apagar:
- DELETE    {local}/paciente/apagar/:id
- DELETE	  {local}/medico/apagar/:id
- DELETE	  {local}/medicamento/apagar/:id
- DELETE	  {local}/consulta/apagar/:id

Funções específicas:
- GET    {local}/consultas/data/:data
essa requisição puxa todas as consultas de um dia específico

- GET	   {local}/consultas/paciente/:id
essa requisição puxa todas as consultas de um paciente específico

- GET	   {local}/consultas/medico/:id
essa requisição puxa todas as consultas de um médico específico

- PATCH    {local}/paciente/inativar/:id
essa requisição inativa um paciente específico

- PATCH	 {local}/medico/inativar/:id
essa requisição inativa um médico específico

- PATCH	 {local}/paciente/reativar/:id
essa requisição reativa um paciente específico

- PATCH	 {local}/medico/reativar/:id
essa requisição reativa um médico específico


## Exemplos Práticos

Cenários de uso práticos.

## Gestão de Erros

Códigos de erro e tratamento de erros.

## Contribuição

Diretrizes para contribuição.

## Exemplos de Respostas

Exemplos de respostas em JSON.

## Suporte

Informações de contato e canais de suporte.

## Licença

Tipo de licença.

## Referências e Recursos Adicionais

[Download do Arquivo .docx](./documents/documentação.docx)
[Download do Arquivo .docx](./documents/Requisitos.docx)
