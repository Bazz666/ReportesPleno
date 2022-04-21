const { functions, procedure_function, procedures } = require('../config/constant');
const execution = require('../config/execute.procedure');



const set_asignatura = async (req, res) => {

    try {
        const parameters = JSON.stringify({
            idAsignatura: req.body.idAsignatura == undefined ? 0 : req.body.idAsignatura,
            asignatura: req.body.asignatura,
            code: req.body.code,
            funcionalidad: procedure_function.prc_set_asignatura.insert_asignatura
        });

        const asignatura = await execution.get(procedures.prc_set_asignatura, parameters);

        if(asignatura[0].CODE == 200){


            res.status(200).json({
                type: 'Info',
                message: 'OK',
                data: asignatura[0].RESPONSE
            });
        }else{
            res.status(200).json({
                type: 'error',
                message: 'No se ha podido insertar o modificar la asignatura',
                data: ""
            });
        }

    } catch (error) {
        
        res.status(200).json({
            type: 'error',
            message: 'Ha ocurrido un error inesperado',
            data: error
        });
    }
};

const delete_asignatura = async (req, res) => {

    try {
        const parameters = JSON.stringify({
            idAsignatura: req.body.idAsignatura == undefined ? 0 : req.body.idAsignatura,
            asignatura: req.body.asignatura,
            code: req.body.code,
            funcionalidad: procedure_function.prc_set_asignatura.delete_asignatura
        });

        const asignatura = await execution.get(procedures.prc_set_asignatura, parameters);

        if(asignatura[0].CODE == 200){


            res.status(200).json({
                type: 'Info',
                message: 'OK',
                data: asignatura[0].RESPONSE
            });
        }else{
            res.status(200).json({
                type: 'error',
                message: 'No se ha podido eliminar la asignatura',
                data: ""
            });
        }

    } catch (error) {
        
        res.status(200).json({
            type: 'error',
            message: 'Ha ocurrido un error inesperado',
            data: error
        });
    }
};


module.exports = {
    set_asignatura,
    delete_asignatura
};