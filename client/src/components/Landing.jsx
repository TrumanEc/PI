import React, {useEffect} from "react";
import { Link} from 'react-router-dom';
import { useDispatch,useSelector}  from 'react-redux';
import { getRecipes } from "../actions";

export default function Landing(){

    const recipesRedux = useSelector(state => state.recipes)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('renderizando home')
        if (recipesRedux.length < 1) {
            dispatch(getRecipes())
        }
    })

    

    return (
        <div>
            <h1>Welcome</h1>
            <Link to='/home'>
                <button type="button" >Start Now</button>
            </Link>
        </div>
    )
}