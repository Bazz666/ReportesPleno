const { functions, procedure_function, procedures } = require('../config/constant');
const execution = require('../config/execute.procedure');
const jwt = require('jsonwebtoken');
const { configuration } = require('../config/db');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);


var hash = bcrypt.hashSync("Santillana2021", salt);


module.exports.password = ((req, res) => {
    res.json({
        password: hash
    })
});

module.exports.login_user = ((req, res) => {
    
    const parameters = [req.get("username")];


    execution.set(functions.fnc_get_validation_user, parameters)
    .then((result) => {
        
        if(result.DATA == 'NOT_VALID'){
            res.json({
                status: 400,
                message: 'Usuario invalido'
            })
        }else{
            
            if(bcrypt.compareSync(req.get("ps"), result.DATA)){
                const tokenRequest = jwt.sign(
                    { data : {
                        user: 'adm'
                    } },
                    configuration.seed.key,
                    { expiresIn: 60 * 60 * 3 },
                    { algorithm: 'RS256' }
                );

                res.json({
                    status: 200,
                    token: tokenRequest
                })
            }else{
                res.json({
                    status: 200,
                    message: 'Usuario invalidas'
                })
            }
        }
        
    })
    .catch(exception => res.json({
        status: 400,
        message: exception
    }))
});