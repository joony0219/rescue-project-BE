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

// error 처리 핸들러
app.use((error, req, res, next) => {
  console.log(error);
  res.statusCode = error.httpCode ?? 500;
  res.json({
    error: error.message,
    data: null,
  });
});

// URL Not found Handler
app.use((req, res, next) => {
  next(
    new AppError(
      commonErrors.resourceNotFoundError,
      404,
      "Resource not found"
    )
  );
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`);
});