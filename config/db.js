const mysql = require('mysql2/promise');
require("dotenv").config();

const conn = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE
});

module.exports = conn;