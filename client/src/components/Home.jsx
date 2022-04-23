import React, {useEffect} from "react";

import Recipes from "./Recipes";
import SearchInput from "./SearchInput";
import Filters from "./Filters"
import { useDispatch,useSelector}  from 'react-redux';
import { getRecipes, getTypes } from "../actions";


export default function Home(){

    const recipesRedux = useSelector(state => state.recipes)


    const dispatch = useDispatch()

    useEffect(() => {
        console.log('renderizando home')
        if (recipesRedux.length < 1) {
            dispatch(getRecipes())
            dispatch(getTypes())
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="home">
            <SearchInput/>
            <Filters/>
            <Recipes/>
        </div>
    )
}