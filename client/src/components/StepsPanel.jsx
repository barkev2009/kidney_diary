import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { editItem } from '../reducers/item';

const StepsPanel = ({ item }) => {

    const dispatch = useDispatch();
    const [steps, setSteps] = useState(item.steps);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editItem({ uuid: item.uuid, steps }));
    }

    return (
        <form onSubmit={submitHandler}>
            <div>Задать количество шагов:</div>
            <input type="number" value={steps} onChange={e => setSteps(e.target.value)} />
            <button disabled={String(steps) === ''} type="submit">SAVE</button>
        </form>
    )
}

export default StepsPanel