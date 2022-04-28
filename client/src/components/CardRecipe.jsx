import React from "react";
import { Link } from 'react-router-dom'

import s from '../styles/CardRecipe.module.css'

export default function CardRecipe(props) {
    const moreInfo = `/recipe/${props.id}`
    


    return (
        <Link to={moreInfo} style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <div className={s.card}>
            <img src={props.img} alt='' className={s.img}/>            
        
        
        <div className={s.info}>
            <h3>{props.name} </h3>
            <p className={s.diets__title}>Diets ✔︎</p>
            <div className={s.diets}>
            { props.diets.map(d => { return <p key={d} className={s.diet}>{d}</p> }) }
            </div>
            <div className={s.score}>
                <p className={s.score__n}>{props.score} ✪ </p>
            </div>
        </div>
        
    </div>
        </Link>
    )
}