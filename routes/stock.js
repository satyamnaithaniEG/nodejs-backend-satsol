const express = require('express');
const router = express.Router();

const StockController = require('../controllers/stock')

router.get('/', StockController._stock_get_all_item);
router.post('/', StockController.stock_add_item);



module.exports = router;