const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
// const product = require("./dao/productDAO/mongoose/model/product_model.js");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
