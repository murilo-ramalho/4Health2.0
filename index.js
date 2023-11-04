const express = require('express');
const conn = require('./config/db');

const PacienteController = require('./controller/PacienteController');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`rodando na porta: ${PORT}`));

app.get('/', (req, res) => res.status(200).send("ta funcionando!!!"));

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