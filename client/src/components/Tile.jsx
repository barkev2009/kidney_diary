import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getByDate } from '../reducers/item';
import { date2String } from '../utils/date';

const Tile = ({ date, year }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const items = useSelector(state => state.item.userItems);

    const [style, setStyle] = useState({});

    const clickHandler = () => {
        dispatch(getByDate({ date, uuid: user.id }));
    }
    useEffect(
        () => {
            setStyle(Number(year) !== date.getFullYear() ? { color: 'gray' } : {});
        }, [date, year]
    );
    useEffect(
        () => {
            const item = items.filter(i => i.date.split('T')[0] === date2String(date))[0];
            if (item) {
                switch (item.total_rating) {
                    case 0:
                        setStyle(prev => ({...prev, backgroundColor: '#703030'}));
                        break;
                    default:
                        setStyle(prev => ({...prev, backgroundColor: 'transparent'}));
                        break;
                }
            }
        }, [items]
    );

    return (
        <div style={style} id={date2String(date)} onClick={clickHandler} className='tile'>
            {date.getDate()}
        </div>
    )
}

export default Tile