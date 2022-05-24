const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const util = require("util");
const path = require("path");
const mysql = require("mysql");
const { body, validationResult } = require("express-validator");

//////////////////////////////////////////////////////////////////////////////////////
let pokemons;
let pabilities;
//////////////////////////////////////////////////////////////////////////////////////
const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(helmet());
app.listen("3000", () => {
  //   console.log("Server Started");
});
////////////////////////////////////////////////////////////////////////////////////////
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "7781",
  database: "pokedex",
});

connection.connect((err) => {
  if (err) throw err;
  //   console.log("DataBase Connected");
});

// query promisified for async/await usage
const query = util.promisify(connection.query).bind(connection);
///////////////////////////////////////////////////////////////////////////////////////////////
async function execquery(sql) {
  try {
    if (sql.includes("pokedetails")) pokemons = await query(sql);
    if (sql.includes("pokeabilities")) pabilities = await query(sql);
    // console.log(pokemons);
  } catch (err) {
    if (err) console.log(err);
  }
}
async function renderQuery(sql, url) {
  await execquery(sql);
  app.get(`${url}`, (req, res) => {
    res.render("home", {
      pokemons: pokemons || [],
      pabilities: pabilities || [],
    });
  });
}
renderQuery("SELECT * from pokedetails limit 10", "/");
renderQuery("SELECT * from pokeabilities limit 10", "/");

app.post("/search", function (req, res) {
  let name = req.body.name;
  let sql = `select * from pokedetails where name like '%${name}%'`;
  renderQuery(sql, "/search");
});

// app.post("/", bodyParser, (req, res) => {
//   console.log(req.body);
//     res.render("home", { pokemons: pokemons });
// });
connection.end();
