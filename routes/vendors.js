const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const VendorsController = require('../controllers/vendors')
router.get('/', checkAuth, VendorsController.vendors_get_all_vendors)
router.get('/all_vendor', checkAuth, VendorsController.vendors_get_all_vendor_name)
router.post('/',checkAuth, VendorsController.vendors_create_vendor);
router.patch('/:id', checkAuth, VendorsController.vendors_update_customer);
router.delete('/:id',checkAuth, VendorsController.vendors_delete_customer);



module.exports = router;