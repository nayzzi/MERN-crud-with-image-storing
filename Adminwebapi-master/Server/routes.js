const express = require('express');
const ProductRoutes = require('./Product/Product.Routes');
const Routes = express.Router();

Routes.use('/products/',ProductRoutes);

module.exports = Routes;