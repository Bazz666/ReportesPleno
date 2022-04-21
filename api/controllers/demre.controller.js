const { functions, procedure_function, procedures } = require('../config/constant');
const execution = require('../config/execute.procedure');

const get_subject = async (req, res) => {

    try {
        const parameters = [];
        const subjects = await execution.get(functions.fnc_get_subject, parameters);

        if(subjects){

            
            let arraySubjects = [];
            arraySubjects = JSON.parse(subjects.DATA);

            res.status(200).json({
                type: 'Info',
                message: 'OK',
                data: arraySubjects
            });
        }else{
            res.status(200).json({
                type: 'error',
                message: 'Ha ocurrido un error inesperado',
                data: []
            });
        }

    } catch (error) {
        
        res.status(200).json({
            type: 'error',
            message: 'Ha ocurrido un error inesperado',
            data: []
        });
    }
};

const get_all_subject = async (req, res) => {

    try {
        const parameters = [];
        const subjects = await execution.get(functions.fnc_get_all_subject, parameters);

        if(subjects){

            
            let arraySubjects = [];
            arraySubjects = JSON.parse(subjects.DATA);

            res.status(200).json({
                type: 'Info',
                message: 'OK',
                data: arraySubjects
            });
        }else{
            res.status(200).json({
                type: 'error',
                message: 'Ha ocurrido un error inesperado',
                data: []
            });
        }

    } catch (error) {
        
        res.status(200).json({
            type: 'error',
            message: 'Ha ocurrido un error inesperado',
            data: []
        });
    }
};

const get_score_ubject = async (req, res) => {

    try {
        const parameters =  [String(req.query.codeSubject)] ;
        const subjects = await execution.get(functions.fnc_get_score_subject, parameters);

        if(subjects){
            let arraySubjects = [];
            arraySubjects = JSON.parse(subjects.DATA);

            res.status(200).json({
                type: 'info',
                message: 'OK',
                data: arraySubjects
            });
        }else{
            res.status(200).json({
                type: 'error',
                message: 'Ha ocurrido un error inesperado',
                data: []
            });
        }

    } catch (error) {
        
        res.status(200).json({
            type: 'error',
            message: 'Ha ocurrido un error inesperado',
            data: []
        });
    }
};

module.exports = {
    get_subject,
    get_all_subject,
    get_score_ubject
}