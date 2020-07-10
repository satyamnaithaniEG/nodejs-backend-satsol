const express = require('express');
const router = express.Router();

const checkAuth  = require('../middleware/check-auth');
const SalesController = require('../controllers/sales')

//router.get('/', checkAuth, ProductsController.products_get_all);


router.post('/', checkAuth,SalesController.sales_create_sales);
router.get('/:skip/:limit',checkAuth, SalesController.sales_get_sales);
router.get('/gst/:gst_percent',checkAuth, SalesController.sales_get_sales_filter_gst)
router.get('/date/:startDate/:endDate',checkAuth, SalesController.sales_get_sales_filter_date)
router.get('/recent',checkAuth, SalesController.sales_get_recent_sale)
router.get('/monthly',checkAuth,SalesController.sales_get_monthly_sale_details)

module.exports = router;