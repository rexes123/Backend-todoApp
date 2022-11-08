const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "demo",
    port: 5432,
    password: "password",
    database: "h2sdb"
})

module.exports = client
