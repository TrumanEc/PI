import axios from 'axios'

export const getRecipes = () => async dispatch => {
    
    try{
        // const recipes = (name) ? await axios.get(`http://localhost:3001/recipes?name=${name}`) : await axios.get(`http://localhost:3001/recipes`);
        const recipes = await axios.get('http://localhost:3001/recipes')
        console.log('accion get recipes')
        console.log(recipes)
        dispatch( {
            type: 'GET_RECIPES',
            payload: recipes.data
        })
    }
    catch(e){
        console.log(e)
    }

}
export const getRecipesMatch = (name) => async dispatch => {
    
    try{
        // const recipes = (name) ? await axios.get(`http://localhost:3001/recipes?name=${name}`) : await axios.get(`http://localhost:3001/recipes`);
        const recipes = await axios.get(`http://localhost:3001/recipes?name=${name}`)
        console.log('accion get match recipes')
        console.log(recipes.data)
        dispatch( {
            type: 'GET_RECIPES_MATCH',
            payload: recipes.data
        })
    }
    catch(e){
        console.log(e)
    }

}

export const getRecipeInfo = (id) => async dispatch => {
    
    try{
        // const recipes = (name) ? await axios.get(`http://localhost:3001/recipes?name=${name}`) : await axios.get(`http://localhost:3001/recipes`);
        const info = await axios.get(`http://localhost:3001/recipes/${id}`)
        console.log('accion get recipe info')
        console.log(info.data)
        dispatch( {
            type: 'GET_RECIPE_INFO',
            payload: info.data
        })
    }
    catch(e){
        console.log(e)
    }

}

export const getTypes = () => async dispatch => {
    try{
        // const recipes = (name) ? await axios.get(`http://localhost:3001/recipes?name=${name}`) : await axios.get(`http://localhost:3001/recipes`);
        const dietTypes = await axios.get(`http://localhost:3001/types`)
        console.log('accion get types')
        console.log(dietTypes)
        dispatch( {
            type: 'GET_TYPES',
            payload: dietTypes.data
        })
    }
    catch(e){
        console.log(e)
    }

}

export const setUpRecipes = (payload)  => {
    return {
        type: 'SET_UP_RECIPES',
        payload: payload
    }
}

export const sortByName = (payload)  => {
    return {
        type: 'SORT_BY_NAME',
        payload: payload
    }
}

export const sortByScore = (payload)  => {
    return {
        type: 'SORT_BY_SCORE',
        payload: payload
    }
}

export const filterDiets = (payload)  => {
    return {
        type: 'FILTER_DIETS',
        payload: payload
    }
}