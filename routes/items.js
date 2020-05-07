const express = require('express');
const router = express.Router();
//const checkAuth = require('../middleware/check-auth')

const ItemsController = require('../controllers/items')

router.get('/all_item', ItemsController.items_get_all_item_name)
router.post('/', ItemsController.items_create_item);
router.get('/:itemName', ItemsController.items_get_item_details);



module.exports = router;