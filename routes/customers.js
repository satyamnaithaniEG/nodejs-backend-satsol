const express = require('express');
const router = express.Router();
//const checkAuth = require('../middleware/check-auth')

const CustomersController = require('../controllers/customers')

router.get('/all', CustomersController.customers_get_all_customers);
router.post('/', CustomersController.customers_create_customers);



module.exports = router;