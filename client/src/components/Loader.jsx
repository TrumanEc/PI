import React from "react";
import s from '../styles/loader.module.css'

export default function Loader(){

    return(
        <div className={s.loader}>
                <div className={s.spinner}>
                    <svg className={s.circular} viewBox="25 25 50 50">
                        <circle className={s.path} cx="50" cy="50" r="20" fill="none" strokeWidth="3" strokeMiterlimit='10'></circle>
                    </svg>
                </div>
        </div>
    )
}