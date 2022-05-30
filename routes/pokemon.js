const express = require("express");
const router = express.Router();
let { data, tdata, query } = require("../model/database.js");
///////////////////////////////////////////////////////////////////////////////////////
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/search", async function (req, res) {
  res.locals.url = req.originalUrl;
  res.locals.host = req.get("host");
  res.locals.protocol = req.protocol;
  await renderQuery(req.body);
  res.render("post", { data: data, tdata: tdata });
});

///////////////////////////////////////////////////////////////////////////////////////

module.exports = router;
