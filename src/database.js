require('dotenv').config(); // Importa dotenv

const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // Default al 3306 se DB_PORT non è definito
}).promise();

module.exports = db;
