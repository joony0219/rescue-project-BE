const express = require("express");
const router = express.Router();
const jsonwebtoken = require("../../util/auth/jwt_utils");
const PRODUCT_CATEGORY = require("../../commonenum/product_cateogry");

router.get("/", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: token not provided" });
  }

  if (!isVerifiedToken(token)) {
    return res
      .status(401)
      .json({ message: "Authentication failed: invalid token" });
  }

  const category = req.query.category;

  res.send("User page");
});

module.exports = router;
