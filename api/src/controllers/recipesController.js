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

// async function dietsArray(id){
//     const dbRecipe = await Recipe.findByPk(id);
//     console.log(dbRecipe)
//     if (dbRecipe) {
//         const dietsArray = await dbRecipe.getDiets();
        
//         const diets = dietsArray.map(d => d.name)
//         console.log(diets)
//         return diets
//     }
// }

module.exports = {
    getRecipe: async (req, res) => {
        const id = req.params.idRecipe;

        try {
            console.log(id, API_KEY)
            const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
            const recipeInfo = {
                img: recipe.data.image,
                name: recipe.data.title,
                dishTypes: recipe.data.dishTypes,
                diets: recipe.data.diets,
                summary: recipe.data.summary,
                score: recipe.data.spoonacularScore,
                healthScore: recipe.data.healthScore,
                instructions: recipe.data.instructions
            }
            res.json(recipeInfo)
        
        } catch (error) {
            const dbRecipe = await Recipe.findByPk(id);
            if (dbRecipe) {
                const dietsArray = await dbRecipe.getDiets();
                const diets = dietsArray.map(d => d.name)
                // const diets = getDiets(id);
                const recipeInfo = {
                    name: dbRecipe.name,
                    dishTypes: dbRecipe.dishTypes,
                    diets: diets,
                    summary: dbRecipe.summary,
                    score: dbRecipe.score,
                    healthScore: dbRecipe.healthScore,
                    instructions: dbRecipe.instructions
                }
                res.json(recipeInfo)
            }
        }
    },

    getRecipes: async(req, res) =>{
        const name = req.query.name;
        const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)
        
        if(name){
            const recipesMatch = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&number=100&addRecipeInformation=true&apiKey=${API_KEY}`);
            
            const dbResults = await Recipe.findAll({
                include: {model: Diet,
                        through: {ttributes: []}
                },
                were: {
                    [Op.or]: [
                        {name: {[Op.like]: `${name}%`}},
                        {name: {[Op.like]: `%${name}%`}},
                        {name: {[Op.like]: `${nameCapitalized}%`}},
                        {name: {[Op.like]: `%${nameCapitalized}%`}}
                    ]
                }
            });

            const dbResultsResume = dbResults.map(r => ({id:r.id, name: r.name,score:r.score , diets: r.diets.map(d=> d.name)}))
            
            const apiResults = recipesMatch.data.results.filter(r => (r.title.includes(name) || r.title.includes(nameCapitalized)) );
            const apiResultsC = apiResults.map(r => ({id: r.id, name: r.title, img:r.image,score: r.spoonacularScore , diets:r.diets}))
            if (apiResults.length < 1 && dbResults.length < 1) {
                res.json({msg: `Nothing match with ${name}`})
            }else{
                
                const allResults = [...dbResultsResume, ...apiResultsC];
                res.json(allResults)
                
            }
        }
    },

    requireQuery: async(req, res, next) => {
        if(!req.query.name){
            const recipesMatch = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&number=100&addRecipeInformation=true&apiKey=${API_KEY}`);
            
            const dbResults = await Recipe.findAll(
                {include: {
                    model: Diet,
                    through: {attributes: []}
            }});
            
            const dbResultsResume = dbResults.map(r => ({id:r.id, name: r.name, score: r.score, diets: r.diets.map(d=> d.name)}))
            const apiResults = recipesMatch.data.results;
            const apiResultsC = apiResults.map(r => ({id: r.id, name: r.title, img:r.image, score: r.spoonacularScore,diets:r.diets}))          
            const allResults = [...dbResultsResume, ...apiResultsC];
            res.json(allResults)
                
    
        }else{
            next()
        }
    },
    postRecipe: async (req, res) =>{
        const r= req.body;
        const newRecipe = await Recipe.create({
            name: r.name,
            summary: r.summary,
            score: r.score,
            healthScore: r.healthScore,
            instructions: r.instructions,
        })
        if(r.diets.length > 0){
            r.diets.forEach(async (d) => {
                const dieta = await Diet.findByPk(d);
                await dieta.addRecipe(newRecipe)
            });
        }
        res.json({msg: `the recipe ${r.name} has been created successfully`});
    }
}