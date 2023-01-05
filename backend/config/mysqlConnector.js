const mysql = require('mysql');
const util = require('util');
const { gdeltHost, gdeltUser, gdeltPassword, gdeltDatabase } = require('./config');

let pool = mysql.createPool({
    connectionLimit : 2000,
    host     : gdeltHost,
    user     : gdeltUser,
    password : gdeltPassword,
    database : gdeltDatabase,
    debug    : false
});

pool.queryPromise = util.promisify(pool.query);

module.exports = pool;
