const express = require("express");
const router = express.Router();

router.get("/search", async function (req, res) {
  res.redirect("/");
});
router.use("/", async function (req, res) {
  res.locals.url = req.originalUrl;
  res.locals.host = req.get("host");
  res.locals.protocol = req.protocol;
  res.render("home");
});

module.exports = router;
