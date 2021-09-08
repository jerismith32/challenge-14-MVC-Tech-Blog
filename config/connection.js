const Sequelize = require('sequelize');
// const mysql = require('mysql');
require('dotenv').config();

// create connection to our db
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });

// if (process.env.JAWSDB_URL) {
//   connection = myql.createConnection(process.env.JAWSDB_URL);
// } else {
//   connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: DB_PW,
//     database: 'techblog_db'
//   });
// };

module.exports = sequelize;