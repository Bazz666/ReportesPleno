const express = require('express');
const app = express();
const authController = require('../../controllers/auth.controller');


app.get('/api/authGuest' ,(req,res) => {
    authController.auth_within_user(req, res);
})

app.post('/api/validate_token', (req, res) => {
    authController.validate_token(req, res);
});




module.exports = app;