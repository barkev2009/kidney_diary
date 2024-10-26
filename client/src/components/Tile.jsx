import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getByDate } from '../reducers/item';

const Tile = ({ setActive, date, year }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)
    const [style, setStyle] = useState({});

    const clickHandler = () => {
        setActive(prev => !prev);
        dispatch(getByDate({ date, uuid: user.id }));
    }
    useEffect(
        () => {
            setStyle(Number(year) !== date.getFullYear() ? { color: 'gray' } : {});
        }, [date, year]
    );

    return (
        <div onClick={clickHandler} className='tile' style={style}>
            {date.getDate()}
        </div>
    )
}

export default Tile