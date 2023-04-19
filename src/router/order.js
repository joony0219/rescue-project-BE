const express = require('express');

const orderRouter = express.Router();

//상품 구매
orderRouter.post('/orders', (req, res) => {});

//구매 목록
orderRouter.get('/orders', (req, res) => {});

module.exports = orderRouter;
