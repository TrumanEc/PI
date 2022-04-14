"use strict";

var express = require("express");

var router = express.Router();

const controllers = require('../controllers/typesCrontroller')

router.get('/', controllers.getTypes);



module.exports = router;