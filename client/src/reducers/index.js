

const initialState = {
    recipes: [],
    allRecipes: [],
    dietTypes: [],
    moreInfoRecipe: []
}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case 'GET_RECIPES':
            return{
                ...state,
                allRecipes: action.payload,
                recipes: action.payload
            }
        case 'GET_RECIPES_MATCH':
            return{
                ...state,
                recipes: action.payload
            }
        case 'SET_UP_RECIPES':
            return{
                ...state,
                recipes: state.allRecipes
            }
        default:
            return{...state}
    }
}



// eslint-disable-next-line import/no-anonymous-default-export
export default rootReducer;