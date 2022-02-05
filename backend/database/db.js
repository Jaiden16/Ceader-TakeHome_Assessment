const pgp = require("pg-promise")({});
let cn = 'postgres://localhost:5432/doctorsapi'
const db = pgp(cn)

module.exports = db;