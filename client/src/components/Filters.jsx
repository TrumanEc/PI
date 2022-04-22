import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortByScore, sortByName } from "../actions";
import { filterDiets } from "../actions";

export default function Filters(){

    const dispatch = useDispatch();
    const types = useSelector(state => state.diets)
    
    const [diets, setDiets] = useState([]);

    useEffect(() => {
        console.log('filters')
        console.log(types)
        document.getElementById('all').checked = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        console.log(diets)
        if (diets.length < 1) {
            setDiets('all')
        }
        if(diets.length > 0){
            (diets === 'all')? dispatch(filterDiets(diets)) : dispatch(filterDiets(diets))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[diets]);


    const handleChangeScore = (e) => {
        e.preventDefault();
        if(e.target.value !== ''){
            dispatch(sortByScore(e.target.value))
        }
    }
    const handleChangeName = (e) => {
        e.preventDefault();
        if(e.target.value !== ''){
            dispatch(sortByName(e.target.value))
        }
    }
    const handleChangeDiets =  (e) => {
        if (e.target.checked === true) {
            if (e.target.value === 'all') {
                const checked = document.getElementsByName('di')
                checked.forEach(element => element.checked = false)
                setDiets(e.target.value)
            }else{
                document.getElementById('all').checked = false;
                const newState = (diets !=='all' ) ? [...diets, e.target.value] : [e.target.value];
                setDiets(newState) 
            }
        }
        if (e.target.checked === false) {
            const newState = diets.filter(i => i !== e.target.value)
            setDiets(newState)
        }
    }
    return (
        <div className="filters">
            <section>
                <label htmlFor='name'>Sort by name</label>
                <select name="nameFilter" id="name" onChange={e => handleChangeName(e)}>
                    <option value="">Elige una opción</option>
                    <option value='AZ'>A - Z</option>
                    <option value='ZA'>Z - A</option>
                </select>
            </section>
            <section>
                <label htmlFor='score'>Sort by Score</label>
                <select name="scoreFilter" id="score" onChange={e => handleChangeScore(e)}>
                    <option value="">Elige una opción</option>  
                    <option value='hihgLow'>High to low</option>
                    <option value='lowHigh'>Low to high</option>
                </select>
            </section>
            <section>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    Diets
                        {types.map(d => {
                            return(
                                <div key={d.name}>
                                    <input type='checkbox' name="di" value={d.name} key={d.id} onChange={e=>handleChangeDiets(e)}/>
                                    {d.name}
                                </div>
                            )}
                        )}
                        <div key='all'>
                            <input type='checkbox' id='all' value='all' onChange={e=>handleChangeDiets(e)}/>
                            All types of Diet
                        </div>
                    </div>
            </section>

        </div>
    )
}