var express = require('express');
var router = express.Router();

var userController = require('../controllers/user-controller')
var authController = require('../controllers/auth-controller')

router.post('/login', authController.login);
router.post('/register', authController.register);

//http://localhost:3000/api/users
router.get('/', userController.index)
router.get('/:id', userController.show)
router.put('/:id', authController.verify, userController.update)
router.delete('/:id', authController.verify, userController.destroy)

module.exports = router;
