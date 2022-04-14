"use strict";

var express = require("express");

var router = express.Router();

const controllers = require('../controllers/recipesController')

router.get('/',controllers.requireQuery, controllers.getRecipes )
router.get('/:idRecipe', controllers.getRecipe);
router.post('/',controllers.postRecipe )


module.exports = router;