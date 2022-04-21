const express = require('express');
const app = express();
const asignaturaController = require('../../controllers/asignatura.controller')
const { checkToken } = require('../../middlewares/authentication');

app.post('/api/setAsignatura', checkToken,(req,res) => {
    asignaturaController.set_asignatura(req,res);
});

app.post('/api/deleteAsignatura',checkToken ,(req,res) => {
    asignaturaController.delete_asignatura(req,res);
});

module.exports = app;