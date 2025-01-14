const mysql = require('mysql2');

// Configurazione del database
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Juventus.34',
    database: 'triage_ml',
}).promise();

module.exports = db;
