const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const StockController = require('../controllers/stock')

router.get('/', checkAuth,StockController._stock_get_all_item);
router.post('/',checkAuth, StockController.stock_add_item);



module.exports = router;