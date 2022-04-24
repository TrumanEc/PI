import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getRecipeInfo } from "../actions";

export default function RecipeInfo(){
    let {idRecipe} = useParams()
    const recipe = useSelector(state => state.info)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipeInfo(idRecipe))
    }, [dispatch, idRecipe]);

    
    if (`${recipe.id}`=== idRecipe) {
        return(

            <div className="info">
            <Link to='/home'>
                <button>Home</button>
            </Link>
    
                <h1>{recipe.name}</h1>
                {
                    recipe.img ? <img src={recipe.img} alt=''/> : <img src='https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505' alt=''/>
                }
                <h3>Diets</h3><ul>
                    {
                        (recipe.diets) ? 
                        recipe.diets.map(d =>  { return <li key={d}>{d}</li>}) 
                        : <li>No diets</li>
                    }
                </ul>
                <h3>Dish types</h3><ul>
                    {
                        (recipe.dishTypes) ? 
                        recipe.dishTypes.map(d =>  { return <li key={d}>{d}</li>}) 
                        : <li>No dish type</li>
                    }
                </ul>
                <h3>Score: {recipe.score}</h3>
                <h3>Health Score: {recipe.healthScore}</h3>
                
                <h3>Summary</h3>
                <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />

                <h3>Instructions</h3>
                <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
                
    
            </div>
        )
    }else{
        return(
            <h1>loading</h1>
        )
    }
    
    
}