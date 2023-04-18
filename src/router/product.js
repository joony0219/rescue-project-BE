const express = require("express");

const router = express.Router();
const Product = require("../dao/productdao/mongoose/model/product_model");

// router.post("/product/add", async (req, res) => {
//   const {
//     category,
//     name,
//     price,
//     count,
//     color,
//     specifications,
//     handlingPrecautions,
//   } = req.body;
//   const product = await Product.create({
//     category,
//     name,
//     price,
//     count,
//     color,
//     specifications,
//     handlingPrecautions,
//   });
//   res.send(product);
// });

// router.post("/product/purchase", (req, res) => {
//   const {
//     user,
//     category,
//     name,
//     price,
//     count,
//     color,
//     specifications,
//     handlingPrecautions,
//   } = req.body;

//   const soldProduct = await Product.create({
//     category,
//     name,
//     price,
//     count,
//     color,
//     specifications,
//     handlingPrecautions,
//   });
//   res.send(soldProduct);
// });
