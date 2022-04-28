import React, { useState, useEffect } from 'react';
import { useSelector}  from 'react-redux'

import s from '../styles/pagination.module.css'

export default function Pagination({ page, setPage, max }){
    const allRecipes = useSelector(state => state.recipes)

    const [input, setInput] = useState(1);

    useEffect(()=>{
        setInput(1);
    },[allRecipes])

    const nextPage = () => {
        setInput(parseInt(input) + 1);
        setPage(parseInt(page) + 1);
    };

    const previousPage = () => {
        setInput(parseInt(input) - 1);
        setPage(parseInt(page) - 1);
    };

    const onKeyDown = e => {
        if (e.keyCode == 13) {
            setPage(parseInt(e.target.value));
            if (
                parseInt(e.target.value < 1) ||
                parseInt(e.target.value) > Math.ceil(max) ||
                isNaN(parseInt(e.target.value))
            ) {
                setPage(1);
                setInput(1);
            } else {
                setPage(parseInt(e.target.value));
            }
        }
    };

    const onChange = e => {
        setInput (e.target.value);
    };

    return(
        <div className={s.pagination}>
            <button className={s.button} disabled={page === 1 || page < 1} onClick={previousPage}>
                ◀︎
            </button>
            <input
            className={s.input}
                onChange={e => onChange(e)}
                onKeyDown={e => onKeyDown(e)}
                name="page"
                autoComplete="off"
                value={input}
            />
            <p> de {max ? Math.ceil(max) : 1 } </p>
            <button className={s.button} disabled={page === Math.ceil(max) || page > Math.ceil(max)}onClick={nextPage}>
                ►
            </button>
        </div>
    )

}