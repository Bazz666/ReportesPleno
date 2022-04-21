const jwt = require('jsonwebtoken');
const { configuration } = require('../config/db');

module.exports.auth_within_user = ((req,res) => {
    const tokenRequest = jwt.sign(
        { data : {
            user: 'register'
        } },
        configuration.seed.key,
        { expiresIn: 60 * 60 * 3 },
        { algorithm: 'RS256' }
    );

    res.json({
        status: 200,
        token: tokenRequest
    })
});

module.exports.validate_token = ((req, res) => {

    const token  = req.body.token; 

    jwt.verify(token, configuration.seed.key, (err, decoded) => {
        if (err) {
          res.json({
            status: 400,
            message: 'El token no es válido',
          });
        }
        req.usuario = decoded.data;
        res.json({
          status: 200,
          menssage: 'Token valido',
        });
      });
});