const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth')
const UserController = require('../controllers/user')

router.get('/all', UserController.users_get_all);

router.post('/signup', UserController.users_signup_user);

router.post('/login', UserController.users_login_user);

router.delete('/:userId',checkAuth, UserController.users_delete_user);
    


module.exports = router;