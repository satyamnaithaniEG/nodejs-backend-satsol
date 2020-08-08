const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const CustomersController = require('../controllers/customers')

router.get('/all',checkAuth, CustomersController.customers_get_all_customers);
router.post('/', checkAuth,CustomersController.customers_create_customers);

router.patch('/:id', checkAuth, CustomersController.customers_update_customer);
router.delete('/:id',checkAuth, CustomersController.customers_delete_customer);

module.exports = router;