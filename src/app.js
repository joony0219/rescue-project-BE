// add libraries
const express = require('express');
const { connectToMongoDB } = require("./util/connection/mongo_connect.js");
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path')
const passport = require('passport');
const AppError = require('./misc/AppError.js');
const commonErrors = require('./misc/commonErrors.js');
const morgan = require('morgan');
const { accessLogStream } = require("./util/logger/access_log_steam.js");
const logger = require("./util/logger/pino.js");
const moment = require('moment-timezone');  
require('./middleware/passport/passport.js');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
morgan.token('date', () => moment().tz('Asia/Seoul').format('DD/MMM/YYYY:HH:mm:ss ZZ'));


// variable
const productRouter = require('./router/product/product_router.js');
const authRouter = require('./router/auth/auth_router.js');
const orderRouter = require('./router/order/order_router');


// port
const app = express();
const PORT = process.env.PORT;


// use libraries
app.set("trust proxy", 1);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(cookieParser());
app.use(passport.initialize()); // passport 미들웨어 등록
app.use(morgan('combined', { stream: accessLogStream, immediate: true}, logger )); // morgan을 이용한 일별 로깅
connectToMongoDB();


// router
app.use('/api/product', productRouter);
app.use('/api/auth', authRouter);
app.use('/api/order', orderRouter);


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


// error 처리 핸들러
app.use((error, req, res, next) => {
  console.log(error);
  res.statusCode = error.httpCode ?? 500;
  res.json({
    error: error.message,
    data: null,
  });
});

module.exports = app