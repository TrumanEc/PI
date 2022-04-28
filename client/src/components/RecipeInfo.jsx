import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getRecipeInfo } from "../actions";

import Loader from './Loader'

import s from '../styles/recipeInfo.module.css'

export default function RecipeInfo(){
    let {idRecipe} = useParams()
    const recipe = useSelector(state => state.info)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipeInfo(idRecipe))
    }, [dispatch, idRecipe]);

    
    if (`${recipe.id}`=== idRecipe) {
        return(

            <div className={s.container}>
                
                <div className={s.info}>
                <Link to='/home' >
                    <button className={s.button}> ← Back</button>
                </Link>
                <h1>{recipe.name}</h1>
                <div className={s.section}>
                    {
                        recipe.img ? <img src={recipe.img} className={s.img} alt=''/> : <img src='https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505' className={s.img} alt=''/>
                    }
                    <div className={s.section__info}> 
                        <h3>Diets</h3><ul>
                            {
                                (recipe.diets) ? 
                                recipe.diets.map(d =>  { return <li className={s.diet} key={d}>{d}</li>}) 
                                : <li>No diets</li>
                            }
                        </ul>
                        <h3 >Dish types</h3><ul>
                            {
                                (recipe.dishTypes) ? 
                                recipe.dishTypes.map(d =>  { return <li className={s.type} key={d}>{d}</li>}) 
                                : <li>No dish type</li>
                            }
                        </ul>
                        <div className={s.scores}>
                            <div className={s.score}><p>✪ {recipe.score}</p></div>
                            <div className={s.health}><p>♥︎ {recipe.healthScore}</p></div>
                        </div>
                        
                    </div>
                </div>
                    <div className={s.extra__container}>
                        <h3>Summary</h3>
                        <div className={s.extra} dangerouslySetInnerHTML={{ __html: recipe.summary }} />
                    </div>
                    
                    <div className={s.extra__container}>
                        <h3>Instructions</h3>
                        <div className={s.extra} dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
                    </div>
                    
                </div>
            </div>
        )
    }else{
        return <div className={s.loader}><Loader/></div> 
    }
    
    
}