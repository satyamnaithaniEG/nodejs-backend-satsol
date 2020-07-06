const express = require('express');
const router = express.Router();

//const checkAuth  = require('../middleware/check-auth');
const SalesController = require('../controllers/sales')

//router.get('/', checkAuth, ProductsController.products_get_all);


router.post('/', SalesController.sales_create_sales);
router.get('/', SalesController.sales_get_sales);
router.get('/gst/:gst_percent', SalesController.sales_get_sales_filter_gst)
router.get('/date', SalesController.sales_get_sales_filter_date)
router.get('/recent', SalesController.sales_get_recent_sale)

module.exports = router;