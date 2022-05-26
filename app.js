const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
//////////////////////////////////////////////////////////////////////////////////////////////
const pokeroutes = require("./routes/pokemon.js");
const app = express();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen("3000", () => {
  //   console.log("Server Started");
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(pokeroutes);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
