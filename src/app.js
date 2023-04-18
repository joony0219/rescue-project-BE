const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const { user, product } = require('./router/index');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(user);
app.use(product);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
