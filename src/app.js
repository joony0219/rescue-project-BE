const express = require('express');
const mongoose = require('mongoose');
require('./util/auth/passport.js');

// port
const app = express();
const port = 3000;

// variable
const productRouter = require('./router/product/product_router.js');
const authRouter = require('./router/auth/auth_router.js');
const orderRouter = require('./router/order/order_router');
const cookieParser = require('cookie-parser');

// add libraries
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

// use libararies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(passport.initialize()); // passport 미들웨어 등록

// router
app.use('/products', productRouter);
app.use('/auth', authRouter);
app.use(orderRouter);

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`);
});
