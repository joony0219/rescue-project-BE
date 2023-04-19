const hashedPassword = require('../../utils/hash');
const { generateToken } = require('../../utils/token');
const { User } = require('../../dao/userdao/mongoose/model');

const signUp = async (req, res) => {
  const { userName, password } = req.body;
  const newUser = await User.create({
    userName,
    password: hashedPassword(password),
  });
  res.send(newUser);
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  if (!user) {
    res.status(401).send({
      message: 'User Not Found',
    });
  }
  if (user.password !== hashedPassword(password)) {
    res.status(401).send({
      message: 'Invalid Password',
    });
  }
  const token = generateToken(user._id);
  res.send(token);
};

module.exports = {
  signUp,
  login,
};
