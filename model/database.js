const mysql = require("mysql");
const util = require("util");

let tdata = [];
let data = [];

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "7781",
  database: "pokedex",
});

const query = util.promisify(connection.query).bind(connection);
exports.query = query;
exports.tdata = tdata;
exports.data = data;
