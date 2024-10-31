import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getByDate } from '../reducers/item';
import { date2String } from '../utils/date';

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
            setStyle(Number(year) !== date.getFullYear() ? { color: 'gray' } : {});
        }, [date, year]
    );
    useEffect(
        () => {
            const item = items.filter(i => i.date.split('T')[0] === date2String(date))[0];
            if (item) {
                let rating;
                let total = false;
                switch (tileType) {
                    case 'water':
                        rating = item.water_rating;
                        break;
                    case 'steps':
                        rating = item.steps_rating;
                        break;
                    default:
                        rating = item.total_rating;
                        total = true
                        break;
                }
                if (total) {
                    switch (rating) {
                        case 0:
                            setStyle(prev => ({ ...prev, backgroundColor: 'hsl(0, 40%, 31%)' }));
                            break;
                        case 1:
                            setStyle(prev => ({ ...prev, backgroundColor: 'hsl(10, 40%, 31%)' }));
                            break;
                        case 2:
                            setStyle(prev => ({ ...prev, backgroundColor: 'hsl(20, 40%, 31%)' }));
                            break;
                        case 3:
                            setStyle(prev => ({ ...prev, backgroundColor: 'hsl(30, 40%, 31%)' }));
                            break;
                        case 4:
                            setStyle(prev => ({ ...prev, backgroundColor: 'hsl(40, 40%, 31%)' }));
                            break;
                        case 5:
                            setStyle(prev => ({ ...prev, backgroundColor: 'hsl(50, 40%, 31%)' }));
                            break;
                        case 6:
                            setStyle(prev => ({ ...prev, backgroundColor: 'hsl(60, 40%, 31%)' }));
                            break;
                        case 7:
                            setStyle(prev => ({ ...prev, backgroundColor: 'hsl(70, 40%, 31%)' }));
                            break;
                        case 8:
                            setStyle(prev => ({ ...prev, backgroundColor: 'hsl(80, 40%, 31%)' }));
                            break;
                        case 9:
                            setStyle(prev => ({ ...prev, backgroundColor: 'hsl(90, 40%, 31%)' }));
                            break;
                        case 10:
                            setStyle(prev => ({ ...prev, backgroundColor: 'hsl(100, 40%, 31%)' }));
                            break;
                        default:
                            setStyle(prev => ({ ...prev, backgroundColor: 'transparent' }));
                            break;
                    }
                } else {
                    switch (rating) {
                        case 0:
                            setStyle(prev => ({ ...prev, backgroundColor: 'hsl(0, 40%, 31%)' }));
                            break;
                        case 1:
                            setStyle(prev => ({ ...prev, backgroundColor: 'hsl(20, 40%, 31%)' }));
                            break;
                        case 2:
                            setStyle(prev => ({ ...prev, backgroundColor: 'hsl(40, 40%, 31%)' }));
                            break;
                        case 3:
                            setStyle(prev => ({ ...prev, backgroundColor: 'hsl(60, 40%, 31%)' }));
                            break;
                        case 4:
                            setStyle(prev => ({ ...prev, backgroundColor: 'hsl(80, 40%, 31%)' }));
                            break;
                        case 5:
                            setStyle(prev => ({ ...prev, backgroundColor: 'hsl(100, 40%, 31%)' }));
                            break;
                        default:
                            setStyle(prev => ({ ...prev, backgroundColor: 'transparent' }));
                            break;
                    }
                }
            }
            if (date2String(new Date()) === date2String(date)) {
                setStyle(prev => ({ ...prev, boxShadow: 'inset 0px 0px 0px 2px white' }))
            }
        }, [items, year, tileType]
    );

    return (
        <div style={style} id={date2String(date)} onClick={clickHandler} className='tile'>
            <div>{date.getDate()}</div>
        </div>
    )
}

export default Tile