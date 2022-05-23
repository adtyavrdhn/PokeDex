const express = require("express");
const parser = require("body-parser");
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

// async function execquery(sql) {
//   try {
//     pokemons = await query(sql);
//     // console.log(pokemons);
//   } catch (err) {
//     if (err) console.log(err);
//   }
// }
// execquery("SELECT * from pokedetails limit 5");
// app.get("/", (req, res) => {
//   res.render("home", { pokemons: pokemons });
// });

async function execquery(sql) {
  try {
    pokemons = await query(sql);
    // console.log(pokemons);
  } catch (err) {
    if (err) console.log(err);
  }
}
async function renderQuery() {
  await execquery("SELECT * from pokedetails limit 10;");
  app.get("/", (req, res) => {
    res.render("home", { pokemons: pokemons || [] });
  });
}
renderQuery();

app.post("/", parser, (req, res) => {
  console.log(req.body);
  //   res.render("home", { pokemons: pokemons });
});

// async function renderQuery2() {
//   await execquery("SELECT * from pokedetails limit 10;");
// }

connection.end();
