import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import { getRecipesMatch } from "../actions";
import { setUpRecipes } from "../actions";

export default function SearchInput(){
    const dispatch = useDispatch();

    const [data, setData] = useState('');

    const handleChange = (e)=>{
        e.preventDefault();
        setData(e.target.value)
        if (e.target.value === '') {
            dispatch(setUpRecipes())
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(getRecipesMatch(data))
        setData('')
    }

    return(
        <div className="searchInput">
            <input type='text' placeholder="Find recipes that match with" onChange={e => handleChange(e)}></input>
            <button type="button" onClick={e => handleClick(e)}>SEARCH</button>
        </div>
    )
}