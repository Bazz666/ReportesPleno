const connection = require('./connection')

/**   @description : Functionality to obtain records. */
module.exports.get = (procedure, data) => new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (!err) {
        conn.query(procedure, [data], (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows[0]);
          }
          console.log(`[PETICION GET]: Se ha ejecutado la siguiente petición: ${procedure}`);
          conn.release();
        });
      } else {
        reject(err);
      }
    });
  });
  
  
  /**   @description : Functionality to save records. */
  module.exports.set = (procedure, data) => new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (!err) {
        conn.query(procedure, [data], (error, rows) => {
          if (error) {
            reject(error);
          } else {
            resolve(rows[0]);
          }
          console.log(`[PETICION SET]: Se ha ejecutado la siguiente petición: ${procedure}`);
          conn.release();
        });
      } else {
        reject(err);
      }
    });
  });