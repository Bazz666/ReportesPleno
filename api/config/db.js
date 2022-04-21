/**   @description : Configuraciones globales a la Base de datos. */
module.exports.configuration = {

    development: {
      host: 'localhost',
      user: 'root',
      password: 'mysecretpassword',
      port: '3306',
      db: 'REPORTPLENO',
      multipleStatements: true,
    },
    preproduction: {
      host: '191.239.252.134',
      user: 'root',
      password: 'luppux2018',
      port: '3306',
      db: 'CENSO',
      multipleStatements: true,
    },
    production: {
      host: '191.234.166.155',
      user: 'root',
      password: 'luppux2018',
      port: '3306',
      db: 'REPORTPLENO',
      multipleStatements: true,
    },
    seed: {
      key: 'reportpleno2020'
    }
  };