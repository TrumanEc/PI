import React from "react";
import { Link} from 'react-router-dom';

export default function Landing(){

    

    

    return (
        <div>
            <h1>Welcome</h1>
            <Link to='/home'>
                <button type="button" >Start Now</button>
            </Link>
        </div>
    )
}