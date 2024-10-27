import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editItem } from '../reducers/item';

const WaterPanel = ({ item }) => {

    const dispatch = useDispatch();
    const [water, setWater] = useState(item.water);

    useEffect(
        () => {
            setWater(item.water);
        }, [item]
    );

    const clickHandler = (water) => {
        return () => {
            dispatch(editItem({ uuid: item.uuid, water: item.water + water }));
        }
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editItem({ uuid: item.uuid, water }));
    }

    return (
        <div>
            <button className='water_button' onClick={clickHandler(60)}>+ 60 мл</button>
            <button className='water_button' onClick={clickHandler(90)}>+ 90 мл</button>
            <button className='water_button' onClick={clickHandler(180)}>+ 180 мл</button>
            <button className='water_button' onClick={clickHandler(600)}>+ 600 мл</button>
            <form onSubmit={submitHandler}>
                <div>Задать количество воды (мл):</div>
                <input id='water_counter' type="number" value={water} onChange={e => setWater(e.target.value)} />
                <button disabled={String(water) === '' || water == item.water} type="submit">SAVE</button>
            </form>
        </div>
    )
}

export default WaterPanel