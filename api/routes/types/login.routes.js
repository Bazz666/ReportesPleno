const express = require('express');
const app = express();
const loginController = require('../../controllers/login.controller')
const { checkToken } = require('../../middlewares/authentication');

app.get('/api/login/password' ,(req,res) => {
    loginController.password(req,res);
})

app.get('/api/login', (req, res) => {
    loginController.login_user(req, res);
});

module.exports = app;