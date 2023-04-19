const express = require("express");
<<<<<<< Updated upstream
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
=======

// port
const app = express();
const port = 3000;

// add libraries
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

// variable
const { user } = require("./router/index");
const productRouter = require("./router/product/product_router.js");

// import passport.js
require("./util/auth/passport.js");

// use libararies
app.use(bodyParser.urlencoded({ extended: true }));
>>>>>>> Stashed changes
app.use(bodyParser.json());

// const router = require("./router/");
// app.use("/board", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(user);

app.listen(7000, () => {
  console.log(`Example app listening on port ${port}`);
});
