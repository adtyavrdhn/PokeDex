const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const util = require("util");
const path = require("path");
const mysql = require("mysql");
const { body, validationResult } = require("express-validator");
const res = require("express/lib/response");

//////////////////////////////////////////////////////////////////////////////////////
let data = [];
//////////////////////////////////////////////////////////////////////////////////////
const app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));
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
// query promisified for async/await usage
const query = util.promisify(connection.query).bind(connection);
///////////////////////////////////////////////////////////////////////////////////////////////
async function execquery(sql) {
  try {
    data = await query(sql);
  } catch (err) {
    if (err) console.log(err);
  }
}

app.post("/search", async function (req, res) {
  let name = req.body.pokename;
  await renderQuery(req.body);
  res.render("post", { data: data });
});

async function renderQuery(query) {
  let name = query.pokename;
  let sql = `SELECT * from pokedetails as pd join pokeabilities using(pokedex_number) where pd.name like '%${name}%'`;
  await execquery(sql);
}
app.get("/search", async function (req, res) {
  await execquery("SELECT * from pokedetails,pokeabilities limit 10;");
  res.render("home", { data: data });
});

app.get("/", async function (req, res) {
  await execquery("SELECT * from pokedetails,pokeabilities limit 10;");
  res.render("home", { data: data });
});

//
