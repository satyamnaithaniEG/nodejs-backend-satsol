const express = require('express');
const router = express.Router();
//const checkAuth = require('../middleware/check-auth')
const Logout_auth = require('../middleware/logout-auth')


router.post('/blacklist',Logout_auth.logout_auth);
router.get('/blacklist',Logout_auth.delete_blacklisted_tokens);




module.exports = router;