import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getByDate } from '../reducers/item';
import { date2String } from '../utils/date';

const getRatingColor = (rating, isTotal) => {
    if (rating == null || rating < 0) return 'transparent';
    const hue = isTotal ? rating * 10 : rating * 20;
    return `hsla(${hue}, 25%, 36%, 0.65)`;
};

const Tile = ({ date, year }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const items = useSelector(state => state.item.userItems);
    const tileType = useSelector(state => state.item.tileType);

    const [style, setStyle] = useState({});

    const clickHandler = () => {
        dispatch(getByDate({ date, uuid: user.id }));
    }
    useEffect(
        () => {
            const item = items.find(i => i.date.split('T')[0] === date2String(date));
            let newStyle = {};

            if (Number(year) !== date.getFullYear()) {
                newStyle.color = 'gray';
            }
            if (item) {
                const isTotal = tileType === 'total';
                let rating;
                switch (tileType) {
                    case 'water': rating = item.water_rating; break;
                    case 'steps': rating = item.steps_rating; break;
                    default: rating = item.total_rating; break;
                }
                newStyle.backgroundColor = getRatingColor(rating, isTotal);
            }
            if (date2String(new Date()) === date2String(date)) {
                newStyle.boxShadow = 'inset 0px 0px 0px 2px white';
            }
            setStyle(newStyle);
        }, [items, year, tileType, date]
    );

    return (
        <div style={style} id={date2String(date)} onClick={clickHandler} className='tile'>
            <div>{date.getDate()}</div>
        </div>
    )
}

export default Tile