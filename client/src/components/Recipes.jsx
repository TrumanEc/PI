import React, { useEffect, useState} from "react";
import { useSelector}  from 'react-redux'
//import { getRecipes } from "../actions";
import CardRecipe from "./CardRecipe";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import s from '../styles/recipes.module.css'
import Loader from './Loader'


export default function Recipes (){
    
    const allRecipes = useSelector(state => state.recipes)

    const [page, setPage] = useState (1);
    const [perPage, setPerPage] = useState (9);

    const max = allRecipes.length / perPage;

    useEffect(()=>{
        console.log('Renderin Recipes')
    },[])
    
    useEffect(()=>{
        setPage(1);
    },[allRecipes])

    if (allRecipes.length > 0 || allRecipes.msg) {
        return (
            <div className={s.container} >
            <div className={s.components}>
                <SearchInput/>
                <Pagination  page={page} setPage={setPage} max={max}/>
            </div>
            
            <Link to='/createRecipe'> Create recipe </Link>
            <div className={s.recipes}>
            {   
                (allRecipes.length > 0) 
                    ? allRecipes.slice(
                        (page - 1) * perPage,
                        (page - 1) * perPage + perPage
                    ).map(r => {
                    return <CardRecipe
                                key={r.id}
                                id={r.id}
                                img={r.img}
                                name={r.name}
                                diets={r.diets}
                                score={r.score}
                            />
                    
                }) : <h2 className={s.msg}>{allRecipes.msg}</h2>
            }
            </div>
            </div>
        )
    }
    else{
        return <div className={s.loader}><Loader/></div> 
    }
    
}