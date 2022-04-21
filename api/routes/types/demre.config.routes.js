const express = require('express');
const app = express();
const demreConfigController = require('../../controllers/demre.config.controller')
const { checkToken } = require('../../middlewares/authentication');

app.post('/api/setPtjeDemre', checkToken ,(req,res) => {
    demreConfigController.set_ptje_demre(req,res);
});

app.post('/api/deletePtjeDemre', checkToken ,(req,res) => {
    demreConfigController.delete_ptje_demre(req,res);
});

module.exports = app;