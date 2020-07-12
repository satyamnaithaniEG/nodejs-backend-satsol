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
router.get('/quarterly',checkAuth,SalesController.sales_get_quarterly_sale_details)
router.get('/last-month',checkAuth,SalesController.sales_get_last_month_sale_details)
router.get('/sales-chart-current-month',checkAuth, SalesController.sales_get_current_month_sale_details_chart)
router.get('/sales-chart-previous-month',checkAuth, SalesController.sales_get_previous_month_sale_details_chart)
router.get('/sales-chart-hospital',checkAuth,SalesController.sales_get_monthly_sale_details_hospital_chart)
module.exports = router;