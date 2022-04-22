import React from "react";
import { Link } from 'react-router-dom'

export default function CardRecipe(props) {
    const moreInfo = `/recipe/${props.id}`
    return (
        <Link to={moreInfo} >
        <div className="card">
        <img src={props.img} alt=''/>
        <h3>{props.name} </h3>
        <h4>Diets:</h4>
        <p>{ props.diets.map(d => { return `${d}, ` }) }</p>
        <h5>score: {props.score}</h5>
    </div></Link>
        
    )
}