const express = require("express");
const router = express.Router();
let { data, tdata, query } = require("../model/database.js");
//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////

async function execquery(sql) {
  try {
    tdata = await query(sql);
  } catch (err) {
    if (err) console.log(err);
  }
}

async function renderQuery(query) {
  let name = query.trainername;
  let base = `SELECT * from trainers as t join gym using(Tid) where Tname like '%${name}%'`;
  await execquery(base);
}

//////////////////////////////////////////////////////////////////////////////////////

router.post("/trainer/search", async function (req, res) {
  res.locals.url = req.originalUrl;
  res.locals.host = req.get("host");
  res.locals.protocol = req.protocol;
  await renderQuery(req.body);
  res.render("post", { tdata: tdata, data: data });
});

//////////////////////////////////////////////////////////////////////////////////////

module.exports = router;
