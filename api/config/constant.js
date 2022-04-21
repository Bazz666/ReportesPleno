module.exports.procedures = {
    prc_set_level: 'CALL REPORTPLENO.PRC_SET_LEVEL(?);',
    prc_set_configuration_level: 'CALL REPORTPLENO.PRC_SET_CONFIGURATION_LEVEL(?);',
    prc_set_ptje_demre: 'CALL REPORTPLENO.PRC_SET_PTJE_DEMRE(?);',
    prc_set_asignatura: 'CALL REPORTPLENO.PRC_SET_ASIGNATURA(?);'
}

module.exports.procedure_function = {
    prc_set_level: {
        create_or_update_level: 'create_or_update_level',
        desactivate_level: 'desactivate_level',
        delete_level: 'delete_level'
    },
    prc_set_configuration_level: {
        create_or_update_conf_level: 'create_or_update_conf_level',
        delete_conf_level: 'delete_conf_level',
        delete_all_config: 'delete_all_config'
    },
    prc_set_ptje_demre: {
        insert_puntaje: 'insert_puntaje',
        delete_puntaje: 'delete_puntaje'
    },
    prc_set_asignatura: {
        insert_asignatura: 'insert_asignatura',
        delete_asignatura: 'delete_asignatura'
    }
}

module.exports.functions = {
    fnc_get_level: 'SELECT REPORTPLENO.FNC_GET_LEVEL(?) AS DATA',
    fnc_get_level_all: 'SELECT REPORTPLENO.FNC_GET_LEVEL_ALL(?) AS DATA',
    fnc_get_config_level: 'SELECT REPORTPLENO.FNC_GET_CONFIG_LEVEL(?) AS DATA',
    fnc_get_validation_user: 'SELECT REPORTPLENO.FNC_VALIDATION_USER(?) AS DATA',
    fnc_get_subject: 'SELECT REPORTPLENO.FNC_GET_SUBJECT(?) AS DATA',
    fnc_get_score_subject: 'SELECT REPORTPLENO.FNC_GET_SCORE_SUBJECT(?) AS DATA',
    fnc_get_all_subject: 'SELECT REPORTPLENO.FNC_GET_SUBJECT_SCORE(?) AS DATA',

}
