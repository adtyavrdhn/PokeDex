const express = require("express");
const util = require("util");
const path = require("path");
var mysql = require("mysql");
let pokemons;
const app = express();

app.set("view engine", "ejs");

app.listen("3000", () => {
  //   console.log("Server Started");
});

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

(async () => {
  try {
    pokemons = await query("select * from pokedetails limit 5");
    // console.log(pokemons);
  } catch (err) {
    if (err) console.log(err);
  }
})();

app.get("/", (req, res) => {
  res.render("home", { pokemons: pokemons });
});

connection.end();
