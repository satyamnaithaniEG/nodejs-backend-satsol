const express = require('express');
const router = express.Router();
//const checkAuth = require('../middleware/check-auth')

const VendorsController = require('../controllers/vendors')

router.get('/all_vendor', VendorsController.vendors_get_all_vendor_name)
router.post('/', VendorsController.vendors_create_vendor);



module.exports = router;