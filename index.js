const express = require('express');
const conn = require('./config/db');

const PacienteController = require('./controller/PacienteController');
const MedicoController = require('./controller/MedicoController');
const MedicamentoController = require('./controller/MedicamentoController');
const ConsultasController = require('./controller/ConsultaController');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`rodando na porta: ${PORT}`));

//teste
app.get('/', (req, res) => res.status(200).send("ta funcionando!!!"));

//paciente
app.get('/pacientes', async (req, res) => {
    const Paciente = new PacienteController(req, res);
    await Paciente.getAll();
});
app.get('/paciente/:id', async (req, res) => {
    const Paciente = new PacienteController(req, res);
    await Paciente.getById();
});
app.post('/paciente/cadastrar', async (req, res) => {
    const Paciente = new PacienteController(req, res);
    await Paciente.post();
});
app.patch('/paciente/atualizar/:id', async (req, res) => {
    const Paciente = new PacienteController(req, res);
    await Paciente.update();
});
app.delete('/paciente/apagar/:id', async (req, res) => {
    const Paciente = new PacienteController(req, res);
    await Paciente.delete();
});
app.patch('/paciente/inativar/:id', async (req, res) => {
    const Paciente = new PacienteController(req, res);
    await Paciente.inativar();
});
app.patch('/paciente/reativar/:id', async (req, res) => {
    const Paciente = new PacienteController(req, res);
    await Paciente.reativar();
});

//médicos
app.get('/medicos', async (req, res) => {
    const Medico = new MedicoController(req, res);
    await Medico.getAll();
});
app.get('/medico/:id', async (req,res) => {
    const Medico = new MedicoController(req, res);
    await Medico.getById();
});
app.post('/medico/cadastrar', async (req,res) => {
    const Medico = new MedicoController(req, res);
    await Medico.insert();
});
app.patch('/medico/atualizar/:id', async (req,res) =>{
    const Medico = new MedicoController(req, res);
    await Medico.update();
});
app.delete('/medico/apagar/:id', async (req,res) => {
    const Medico = new MedicoController(req, res);
    await Medico.delete();
});
app.patch('/medico/inativar/:id', async (req,res) => {
    const Medico = new MedicoController(req, res);
    await Medico.inativar();
});
app.patch('/medico/reativar/:id', async (req,res) => {
    const Medico = new MedicoController(req, res);
    await Medico.reativar();
});

//medicamento
app.get('/medicamentos', async (req,res) => {
    const Medicamento = new MedicamentoController(req, res);
    await Medicamento.getAll();
});
app.get('/medicamento/:id', async (req,res) => {
    const Medicamento = new MedicamentoController(req, res);
    await Medicamento.getById();
});
app.post('/medicamento/inserir', async (req,res) => {
    const Medicamento = new MedicamentoController(req, res);
    await Medicamento.inserir();
});
app.patch('/medicamento/atualizar/:id', async (req,res) => {
    const Medicamento = new MedicamentoController(req, res);
    await Medicamento.update();
});
app.delete('/medicamento/apagar/:id', async (req,res) => {
    const Medicamento = new MedicamentoController(req, res);
    await Medicamento.delete();
});

//consultas
app.get('/consultas', async (req,res) => {
    const consultas = new ConsultasController(req, res);
    await consultas.getAll();
});
app.get('/consulta/:id', async (req,res) => {
    const consulta = new ConsultasController(req, res);
    await consulta.getById();
});
app.post('/consulta/inserir', async (req,res) => {
    const consultas = new ConsultasController(req,res);
    await consultas.inserir();
});
app.patch('/consulta/atualizar/:id', async (req,res) => {
    const consulta = new ConsultasController(req,res);
    await consulta.update();
});
app.delete('/consulta/apagar/:id', async (req,res) => {
    const consulta = new ConsultasController(req,res);
    await consulta.delete();
});
app.get('/consultas/medico/:id', async (req,res) => {
    const consulta = new ConsultasController(req,res);
    await consulta.consultaMedico();
});
app.get('/consultas/paciente/:id', async (req,res) => {
    const consulta = new ConsultasController(req,res);
    await consulta.consultaPaciente();
});
app.get('/consultas/dia/:data', async (req,res) => {
    const consulta = new ConsultasController(req,res);
    await consulta.consultaDia();
});