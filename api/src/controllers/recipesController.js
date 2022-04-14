require('dotenv').config();
const { Op } = require("sequelize");
const {Recipe, Diet} = require('../db')
const axios = require('axios').default;
const {API_KEY} = process.env;

// [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
// [ ] Resumen del plato
// [ ] Puntuación
// [ ] Nivel de "comida saludable"
// [ ] Paso a paso


module.exports = {
    getRecipe: async (req, res) => {
        const id = req.params.idRecipe;
        try {
            console.log(id, API_KEY)
            const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
            const recipeInfo = {
                img: recipe.data.image,
                name: recipe.data.sourceName,
                dishTypes: recipe.data.dishTypes,
                diets: recipe.data.diets,
                resume: recipe.data.title,
                score: recipe.data.spoonacularScore,
                healthScore: recipe.data.healthScore,
                instructions: recipe.data.instructions
            }
            res.json(recipeInfo)
        
        } catch (error) {
            const dbRecipe = await Recipe.findByPk(id);
            const dietsArray = await dbRecipe.getDiets();
            const diets = dietsArray.map(d => ({name: d.name, id:d.id}))
            const recipeInfo = {
                name: dbRecipe.sourceName,
                dishTypes: dbRecipe.dishTypes,
                diets: diets,
                resume: dbRecipe.title,
                score: dbRecipe.spoonacularScore,
                healthScore: dbRecipe.healthScore,
                instructions: dbRecipe.instructions
            }
            res.json(recipeInfo)
        }
    },

    getRecipes: async(req, res) =>{
        const name = req.query.name;
        if(name){
            const recipesMatch = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=100&addRecipeInformation=true&apiKey=${API_KEY}`);
            const dbResults = await Recipe.findAll({
                were: {
                    [Op.or]: [
                        {sourceName: {[Op.like]: `${name}%`}},
                        {sourceName: {[Op.like]: `%${name}%`}}
                    ]
                }
            });
            const apiResults = recipesMatch.data.results;


            if (apiResults.length < 1 && dbResults.length < 1) {
                res.send(`Nothing match with ${name}`)
            }else{
                
                const allResults = [...dbResults, ...apiResults];
                res.json(allResults)
                
            }
        }
    },

    requireQuery: (req, res, next) => {
        if(!req.query.name){
            console.log('Please start to search our Recipes with the search input')
            res.send('Please start to search our Recipes with the search input')
        }else{
            next()
        }
    },
    postRecipe: async (req, res) =>{
        const r= req.body;
        const newRecipe = await Recipe.create({
            sourceName: r.sourceName,
            title: r.title,
            score: r.score,
            healtScore: r.healtScore,
            instructions: r.instructions,
        })
        if(r.diets.length > 0){
            r.diets.forEach(async (d) => {
                const dieta = await Diet.findByPk(d);
                await dieta.addRecipe(newRecipe)
            });
        }
        res.json({msg: `the recipe ${r.sourceName} has been created successfully`});
    }
}