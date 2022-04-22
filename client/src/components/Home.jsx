import React, { useEffect} from "react";

import Recipes from "./Recipes";
import SearchInput from "./SearchInput";


export default function Home(){

    useEffect(()=>{
        console.log('Amount Home component')
    },[])


    return (
        <div className="home">
            <SearchInput/>
            <Recipes/>
        </div>
    )
}