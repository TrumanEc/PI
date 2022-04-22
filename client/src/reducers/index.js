

const initialState = {
    recipes: [],
    diets: [],
    allRecipes: [],
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
        case 'GET_TYPES':
            return{
                ...state,
                diets: action.payload
            }
        case 'SORT_BY_NAME':
            let sortedNames = [...state.recipes];
            if (action.payload === 'AZ') {
                sortedNames = sortedNames.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
            }else{
                sortedNames = sortedNames.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1)
            }
            return{
                ...state,
                recipes: sortedNames
            }
        case 'SORT_BY_SCORE':
            let sortedScore = [...state.recipes];
            if (action.payload === 'lowHigh') {
                sortedScore = sortedScore.sort((a,b) => a.score - b.score)
                console.log(sortedScore)
            }else{
                sortedScore = sortedScore.sort((a,b) => b.score - a.score)
                console.log(sortedScore)
            }
            return{
                ...state,
                recipes: sortedScore
            }
        case 'FILTER_DIETS':
            if (action.payload === 'all') {
                return{
                    ...state,
                    recipes: state.allRecipes
                }
            }else{
                let filterArray = (state.recipes.length > 1)?state.recipes:state.allRecipes;
                action.payload.forEach(d => {
                    console.log(d.toLowerCase())
                    filterArray = filterArray?.filter(r => r.diets.includes(d.toLowerCase()))
                });
                if (filterArray.length < 1) {
                    filterArray = {msg: 'Noting matches'}
                }
                console.log(filterArray)
                return{
                    ...state,
                    recipes: filterArray
                }
            }
            
        default:
            return{...state}
    }
}



// eslint-disable-next-line import/no-anonymous-default-export
export default rootReducer;