const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "7781",
  database: "pokedex",
});

const query = util.promisify(connection.query).bind(connection);

module.exports = { query: query };
