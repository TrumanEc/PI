const { Router } = require('express');
// Importar todos los routers;
const types = require('./types')
const recipes = require('./recipes')
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/types', types);
router.use('/recipes', recipes);


module.exports = router;
