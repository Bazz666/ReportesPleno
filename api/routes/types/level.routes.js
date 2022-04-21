const express = require('express');
const app = express();
const levelController = require('../../controllers/level.controller')
const { checkToken } = require('../../middlewares/authentication');

app.get('/api/level' ,(req,res) => {
    levelController.get_level(req,res);
})

app.get('/api/level/all',checkToken ,(req,res) => {
    levelController.get_level_all(req,res);
})

app.get('/api/level/config' ,(req,res) => {
    levelController.get_config_level(req, res);
})

app.post('/api/level', checkToken ,(req,res) => {
    levelController.set_level(req, res);
})

app.put('/api/level', checkToken,(req, res) => {
    levelController.set_status_level(req, res);
})

app.delete('/api/level', checkToken,(req, res) => {
    levelController.delete_level(req, res)
});


app.post('/api/conflevel', checkToken,(req, res) => {
    levelController.create_or_update_conflevel(req, res);
});

app.delete('/api/conflevel', checkToken, (req, res) => {
    levelController.delete_all_config_level(req, res);
})
module.exports = app;