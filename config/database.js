const mysql = require('mysql');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    connectionLimit: 10
});

pool.getConnection((err, connection) => {
    if(err) throw err;

    console.log(`connected on ${connection.threadId}`);
});

module.exports = pool;