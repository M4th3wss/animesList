const { Pool } = require('pg');

module.exports = new Pool({
    user: "postgres",
    host: "localhost",
    database: "animes_db",
    password: "mate13123",
    port: 5000
});