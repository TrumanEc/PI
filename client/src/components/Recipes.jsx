import React, { useEffect} from "react";
import { useSelector}  from 'react-redux'
//import { getRecipes } from "../actions";
import CardRecipe from "./CardRecipe";

export default function Recipes (){
    
    const allRecipes = useSelector(state => state.recipes)

    //const [recipes, setRecipes] = useState(props.recipes);
    
    // const dispatch = useDispatch()

    useEffect(()=>{
        console.log('Renderin Recipes')
    },[])

    

    return (
        <div className="Recipes" >
        <div>Recipes</div>
        {   
            (allRecipes.length > 0) ? allRecipes.map(r => {
                return <CardRecipe
                            key={r.id}
                            id={r.id}
                            img={r.img}
                            name={r.name}
                            diets={r.diets}
                            score={r.score}
                        />
                
            }) : <h2>{allRecipes.msg}</h2>
        }
        </div>
    )
}