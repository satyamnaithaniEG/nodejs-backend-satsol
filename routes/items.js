const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const ItemsController = require('../controllers/items')

router.get('/all_item', checkAuth,ItemsController.items_get_all_item_name)
router.post('/', checkAuth,ItemsController.items_create_item);
router.get('/:itemName', checkAuth,ItemsController.items_get_item_details);
router.patch('/:id', checkAuth, ItemsController.items_update_item);
router.delete('/:id',checkAuth, ItemsController.items_delete_item);



module.exports = router;