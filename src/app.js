const express = require("express");
const mongoose = require("mongoose");
require("./util/auth/passport.js");

// port
const app = express();
const port = 3000;

// variable
const { user } = require("./router/index");
const productRouter = require("./router/product/product_router.js");

// add libraries
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

// use libararies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize()); // passport 미들웨어 등록

// router
app.use("/product", productRouter);

app.use(user);

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`);
});
