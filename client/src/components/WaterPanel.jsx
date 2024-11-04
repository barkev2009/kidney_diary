import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editItem } from '../reducers/item';

const WaterPanel = ({ item }) => {

    const dispatch = useDispatch();
    const [water, setWater] = useState(0);

    useEffect(
        () => {
            setWater(0);
        }, [item.water]
    );

    const clickHandler = (water) => {
        return () => {
            dispatch(editItem({ uuid: item.uuid, water: Number(item.water) + Number(water) }));
        }
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editItem({ uuid: item.uuid, water: Number(item.water) + Number(water) }));
    }

    return (
        <div>
            <button className='water_button' onClick={clickHandler(60)}>+ 60 мл</button>
            <button className='water_button' onClick={clickHandler(90)}>+ 90 мл</button>
            <button className='water_button' onClick={clickHandler(180)}>+ 180 мл</button>
            <button className='water_button' onClick={clickHandler(600)}>+ 600 мл</button>
            <form onSubmit={submitHandler}>
                <div>Задать дельту количества воды (мл):</div>
                <input id='water_counter' type="number" value={water} onChange={e => setWater(e.target.value)} />
                <button disabled={String(water) === '' || water == item.water} type="submit">SAVE</button>
            </form>
        </div>
    )
}

export default WaterPanel