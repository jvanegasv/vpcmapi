var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.routeGuard, userController.index);

router.post('/login', userController.login);

router.post('/apilogin', userController.apilogin);

module.exports = router;
