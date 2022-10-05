const mysql = require("mysql");
const util = require("util");

let tdata = [];
let data = [];

const connection = mysql.createConnection({
  host: "****",
  user: "****",
  password: "****",
  database: "pokedex",
});

const query = util.promisify(connection.query).bind(connection);
exports.query = query;
exports.tdata = tdata;
exports.data = data;
