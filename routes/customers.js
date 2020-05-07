const express = require('express');
const router = express.Router();
//const checkAuth = require('../middleware/check-auth')

const CustomersController = require('../controllers/customers')


router.post('/', CustomersController.customers_create_customers);



module.exports = router;