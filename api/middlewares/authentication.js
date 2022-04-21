const jwt = require('jsonwebtoken');
const global = require('../config/db');


/**   @description : Funcionalidad destinada a validar el token para ejecutar servicios. */
module.exports.checkToken = ((req, res, next) => {
  const token = req.get('token');
  jwt.verify(token, global.configuration.seed.key, (err, decoded) => {
    if (err) {
      return res.json({
        status: 400,
        message: 'El token no es válido',
      });
    }
    req.usuario = decoded.data;
    return next();
  });
});

/**   @description : Funcionalidad destinada a validar el token de forma manual. */
module.exports.checkTokenManual = ((req, res) => {
  const token = req.get('token');

  
  jwt.verify(token, global.configuration.seed.key, (err, decoded) => {
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
