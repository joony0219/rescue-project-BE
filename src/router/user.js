const express = require("express");
const router = express.Router();
const hashPassword = require("../util/hash");

const User = require("../dao/userdao/mongoose/model/user_model");

router.post("/user/new-user", async (req, res) => {
  const { userName, password } = req.body;
  const hashedPassword = hashPassword(password);
  const newUser = await User.create({
    userName,
    password: hashedPassword,
  });
  res.send(newUser);
});

// router.login("/users/login", async (req, res) => {
//   const { userName, password } = req.body;
//   const loginUser = await User.find({ userName });
//   if (!loginUser) {
//     res.send({
//       error: true,
//       msg: "User does not exist",
//     });
//   }
//   if (loginUser.password !== hashPassword(password)) {
//     return res.send({
//       error: true,
//       msg: "Invalid password",
//     });
//   }

//   res.send({ loginUser });
// });

module.exports = router;
