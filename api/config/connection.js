const mysql = require('mysql');
const { configuration } = require('./db');

const pool = mysql.createPool({
  host: configuration.production.host,
  user: configuration.production.user,
  password: configuration.production.password,
  database: configuration.production.db,
  port: configuration.production.port,
  multipleStatements: configuration.production.multipleStatements,
});
pool.getConnection((err, connection) => {
  if (err) {
    console.error(`[ERROR]: Error en la conexión BD [CODE] => ${err.code}.`);
  } else {
    console.log(`[SUCCESS]: Conexión exitosa BD       [ID] => ${connection.threadId}.`);
    connection.release();
  }
});
module.exports = pool;