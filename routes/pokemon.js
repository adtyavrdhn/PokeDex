const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const util = require("util");
let data = [];

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "7781",
  database: "pokedex",
});

const query = util.promisify(connection.query).bind(connection);
async function execquery(sql) {
  try {
    data = await query(sql);
  } catch (err) {
    if (err) console.log(err);
  }
}

async function renderQuery(query) {
  let name = query.pokename;
  let legendary = query.legendary == "on" ? true : false;
  let base = `SELECT * from pokedetails as pd join pokeabilities using(pokedex_number) where pd.name like '%${name}%'`;

  if (legendary) base += "AND is_legendary = 1";

  await execquery(base);
}

router.post("/search", async function (req, res) {
  let name = req.body.pokename;
  await renderQuery(req.body);
  res.render("post", { data: data });
});

router.use("/", async function (req, res) {
  res.render("home");
});

module.exports = router;
