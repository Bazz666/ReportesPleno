const { functions, procedure_function, procedures } = require('../config/constant');
const execution = require('../config/execute.procedure');


module.exports.get_level = ((req, res) => {
    
    const parameters = [];
    execution.get(functions.fnc_get_level, parameters)
    .then((result) => {
        res.json({
            status: 200,
            levels: JSON.parse(result.DATA)
        })
    })
    .catch(exception => res.json({
        status: 400,
        message: exception
    }));

});

module.exports.get_level_all = ((req, res) => {
    
    const parameters = [];
    execution.get(functions.fnc_get_level_all, parameters)
    .then((result) => {
        res.json({
            status: 200,
            levels: JSON.parse(result.DATA)
        })
    })
    .catch(exception => res.json({
        status: 400,
        message: exception
    }));

});

module.exports.delete_level = ((req, res) => {
    const parameters = JSON.stringify({
        idLevel: req.get("idLevel"),
        funcionalidad: procedure_function.prc_set_level.delete_level
    });

    execution.set(procedures.prc_set_level, parameters)
    .then((result) => {
        res.json({
            status: result[0].CODE ,
            message: result[0].RESPONSE
        })
    })
    .catch(exception => res.json({
        status: 400,
        message: exception
    }))


})

module.exports.get_config_level = ((req, res) => {
    const parameters = [Number(req.get('idLevel'))];

    execution.get(functions.fnc_get_config_level, parameters)
    .then((result) => {
        res.json({
            status: 200,
            config: JSON.parse(result.DATA)
        })
    })
    .catch(exception => res.json({
        status: 400,
        message: exception
    }));
});

module.exports.set_level = ((req, res) => {

    const parameters = JSON.stringify({
        idLevel: req.body.idLevel,
        nameLevel: req.body.nameLevel,
        statusLevel: req.body.statusLevel,
        funcionalidad: procedure_function.prc_set_level.create_or_update_level
    });

    execution.set(procedures.prc_set_level, parameters)
    .then((result) => {
        
        res.json({
            status: result[0].CODE,
            message: result[0].RESPONSE
        })
    })
    .catch(exception => res.json({
        status: 400,
        message: exception
    }));

});

module.exports.set_status_level = ((req, res) => {
    const parameters = JSON.stringify({
        idLevel : req.get('idLevel'),
        funcionalidad : procedure_function.prc_set_level.desactivate_level
    });

    execution.set(procedures.prc_set_level, parameters)
    .then((result) => {
        
        res.json({
            status: result[0].CODE,
            message: result[0].RESPONSE
        })
    })
    .catch(exception => res.json({
            status: 400,
            message: exception
    }));
})


module.exports.create_or_update_conflevel = ((req,res) => {

    const parameters = JSON.stringify({
        idConfLevel: req.body.idConflevel,
        nameConfLevel: req.body.level,
        minLevel: req.body.min,
        maxLevel: req.body.max,
        idNivel: req.body.idNivel,
        funcionalidad: procedure_function.prc_set_configuration_level.create_or_update_conf_level
    })

    
    execution.set(procedures.prc_set_configuration_level, parameters)
    .then((result) => {
        res.json({
            status: result[0].CODE,
            message: result[0].RESPONSE
        })
    })
    .catch(exception => res.json({
        status: 400,
        message: exception
    }))
});

module.exports.delete_all_config_level = ((req, res) => {
    const parameters = JSON.stringify({
        idNivel: req.get("idNivel"),
        funcionalidad: procedure_function.prc_set_configuration_level.delete_all_config
    });

    execution.set(procedures.prc_set_configuration_level, parameters)
    .then((result) => {
        res.json({
            status: 200,
            message: 'Se ha eliminado la configuración de nivel de logro'
        })
    })
    .catch(exception => res.json({
        status: 400,
        message: exception
    }))
})