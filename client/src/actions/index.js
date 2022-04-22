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
        console.log('accion get recipes')
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

export const setUpRecipes = (payload)  => {
    return {
        type: 'SET_UP_RECIPES',
        payload: payload
    }
}