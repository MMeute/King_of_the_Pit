var express = require('express');
var router = express.Router();
var seed = require("../config/seed.js")

var seedController = require("../config/seed")

//http://localhost:3000/api/seed
router.get('/users', seedController.seedUsers);

module.exports = router;