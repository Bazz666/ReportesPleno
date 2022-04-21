const { functions, procedure_function, procedures } = require('../config/constant');
const execution = require('../config/execute.procedure');



const set_ptje_demre = async (req, res) => {

    try {
        const parameters = JSON.stringify({
            asignatura: req.body.asignatura,
            cntOk: req.body.cntOk,
            puntaje: req.body.puntaje,
            funcionalidad: procedure_function.prc_set_ptje_demre.insert_puntaje
        });

        const ptje_demre = await execution.get(procedures.prc_set_ptje_demre, parameters);

        if(ptje_demre[0].CODE == 200){


            res.status(200).json({
                type: 'Info',
                message: 'OK',
                data: ptje_demre[0].RESPONSE
            });
        }else{
            res.status(200).json({
                type: 'error',
                message: 'No se ha podido insertar el puntaje',
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

const delete_ptje_demre = async (req, res) => {

    try {
        const parameters = JSON.stringify({
            asignatura: req.body.asignatura,
            cntOk: req.body.cntOk,
            puntaje: req.body.puntaje,
            funcionalidad: procedure_function.prc_set_ptje_demre.delete_puntaje
        });

        const ptje_demre = await execution.get(procedures.prc_set_ptje_demre, parameters);

        
        if(ptje_demre[0].CODE == 200){


            res.status(200).json({
                type: 'Info',
                message: 'OK',
                data: ptje_demre[0].RESPONSE
            });
        }else{
            res.status(200).json({
                type: 'error',
                message: 'No se ha podido eliminar el puntaje',
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
    set_ptje_demre,
    delete_ptje_demre
};