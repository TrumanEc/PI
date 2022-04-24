import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { postRecipe } from '../actions';

function validate(input) {
    let errors = {};

    if (!input.name) {
        errors.name = 'Name is required';
    } else if (!typeof(input.name) === 'string') {
        errors.name = 'Name is invalid';
    }

    if (!input.score) {
        errors.score = 'score is required';
    } else if (!typeof(input.score) === 'number' || input.score < 0 || input.score > 100) {
        errors.score = 'score is invalid';
    }

    if (!input.healthScore) {
        errors.healthScore = 'healthScore is required';
    } else if (!typeof(input.healthScore) === 'number' || input.healthScore < 0 || input.healthScore > 100){
        errors.healthScore = 'healthScore is invalid';
    }

    if (!input.summary) {
        errors.summary = 'summary is required';
    } else if (!typeof(input.summary) === 'string') {
        errors.summary = 'summary is invalid';
    }

    if (!input.instructions) {
        errors.instructions = 'instructions is required';
    } else if (!typeof(input.instructions) === 'string') {
        errors.instructions = 'instructions is invalid';
    }
    return errors;
};

export default function AddRecipe() {
    const types = useSelector(state => state.diets)
    const response = useSelector(state => state.created)

    const dispatch = useDispatch()
    const [input, setInput] = useState({
        name: '',
        summary: '',
        score: '',
        healthScore: '',
        instructions: '',
        diets: []
    })
    const [errors, setErrors] = useState({});

    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleChangeDiets =  (e) => {
        if (e.target.checked === true) {
            if (e.target.value === 'all') {
                const checked = document.getElementsByName('di')
                checked.forEach(element => element.checked = false)
                setInput({...input, diets: []})
            }else{
                document.getElementById('all').checked = false;
                const diets = (input.diets !== [] ) ? [...input.diets, e.target.value] : [e.target.value];
                setInput({...input, diets: diets}) 
            }
        }
        if (e.target.checked === false) {
            const diets = input.diets.filter(i => i !== e.target.value)
            setInput({...input, diets: diets})
        }
    }

    const handleClick = () =>{
            dispatch(postRecipe(input))
    }

    return (
        <div className='addRecipe' style={{display: 'flex', flexDirection: 'column'}}>
            <label> Name </label>
            <input name='name' type='' onChange={e => handleChange(e)}></input>
                {   errors.name && (<p className="danger">{errors.name}</p>)    }

            <label> Score </label>
            <input name='score' type='number' onChange={e => handleChange(e)}></input>
                {   errors.score && (<p className="danger">{errors.score}</p>)    }

            <label> Health Score </label>
            <input name='healthScore' type='number' onChange={e => handleChange(e)}></input>
                {   errors.healthScore && (<p className="danger">{errors.healthScore}</p>)    }

            <label> Summary </label>
            <input name='summary' type='' onChange={e => handleChange(e)}></input>
                {   errors.summary && (<p className="danger">{errors.summary}</p>)    }

            <label> Instructios </label>
            <input name='instructions' type='' onChange={e => handleChange(e)}></input>
                {   errors.instructions && (<p className="danger">{errors.instructions}</p>)    }

            <section>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                Diets
                    {types.map(d => {
                        return(
                            <div key={d.name}>
                                <input type='checkbox' name="di" value={d.id} key={d.id} onChange={e=>handleChangeDiets(e)}/>
                                {d.name}
                            </div>
                        )}
                    )}
                    <div key='all'>
                        <input type='checkbox' id='all' value='all' onChange={e=>handleChangeDiets(e)}/>
                        No Diets
                    </div>
                </div>
            </section>
            <button onClick={handleClick} disabled={errors === {} ? true : false} >Done</button>
            {
                response && (<h2>{response.msg}</h2>)
            }

        </div>
    )
}