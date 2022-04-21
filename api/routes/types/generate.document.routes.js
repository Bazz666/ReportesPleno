const express = require('express');
const app = express();
const generate_controller_pdf = require('../../controllers/generate.document.controller')
const { checkToken } = require('../../middlewares/authentication');

app.post('/api/informe/generate/' ,(req, res) => {
    generate_controller_pdf.generate_pdf(req,res)
});


app.post('/api/informe/graphic', (req, res) => {
    generate_controller_pdf.generate_pdf_graphic(req, res);
});



module.exports = app;