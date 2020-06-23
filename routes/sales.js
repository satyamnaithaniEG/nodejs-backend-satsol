const express = require('express');
const router = express.Router();

//const checkAuth  = require('../middleware/check-auth');
const SalesController = require('../controllers/sales')

//router.get('/', checkAuth, ProductsController.products_get_all);


router.post('/', SalesController.sales_create_sales);

module.exports = router;