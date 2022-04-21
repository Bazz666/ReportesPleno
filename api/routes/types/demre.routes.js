const express = require('express');
const app = express();
const demreController = require('../../controllers/demre.controller')

app.get('/api/getSubject' ,(req,res) => {
    demreController.get_subject(req,res);
});

app.get('/api/getScoreSubject' ,(req,res) => {
    demreController.get_score_ubject(req,res);
});

app.get('/api/getAllScoreSubject' ,(req,res) => {
    demreController.get_all_subject(req,res);
});

module.exports = app;