import React from "react";

import Recipes from "./Recipes";
import SearchInput from "./SearchInput";
import Filters from "./Filters"


export default function Home(){
    return (
        <div className="home">
            <SearchInput/>
            <Filters/>
            <Recipes/>
        </div>
    )
}