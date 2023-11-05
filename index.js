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
    await PacienteController.getAll();
});
app.get('/paciente/:id', async (req, res) => {
    const Paciente = new PacienteController(req, res);
    await Paciente.getById();
});
app.post('/paciente/', async (req, res) => {
    const Paciente = new PacienteController(req, res);
    await Paciente.post();
});
app.patch('/paciente/:id', async (req, res) => {
    const Paciente = new PacienteController(req, res);
    await Paciente.update();
});
app.delete('/paciente/:id', async (req, res) => {
    const Paciente = new PacienteController(req, res);
    await Paciente.delete();
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
app.post('/medico', async (req,res) => {
    const Medico = new MedicoController(req, res);
    await Medico.insert();
});
app.patch('/medico/:id', async (req,res) =>{
    const Medico = new MedicoController(req, res);
    await Medico.update();
});
app.delete('/medico/:id', async (req,res) => {
    const Medico = new MedicoController(req, res);
    await Medico.delete();
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
app.post('/medicamento', async (req,res) => {
    const Medicamento = new MedicamentoController(req, res);
    await Medicamento.inserir();
});
app.patch('/medicamento/:id', async (req,res) => {
    const Medicamento = new MedicamentoController(req, res);
    await Medicamento.update();
});
app.delete('/medicamento/:id', async (req,res) => {
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
app.post('/consulta', async (req,res) => {
    const consultas = new ConsultasController(req,res);
    await consultas.inserir();
});
app.patch('/consulta/:id', async (req,res) => {
    const consulta = new ConsultasController(req,res);
    await consulta.update();
});
app.delete('/consulta/:id', async (req,res) => {
    const consulta = new ConsultasController(req,res);
    await consulta.delete();
});