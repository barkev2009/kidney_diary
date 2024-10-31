import React from 'react'
import { TILE_ITEMS, WEEKDAYS } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { getByUser, setTileType } from '../reducers/item';
import { setActive } from '../reducers/userParameter';

const WeekdaysContainer = ({ setYear, year }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const tileType = useSelector(state => state.item.tileType);
    const selectHandler = (e) => {
        setYear(e.target.value);
        dispatch(getByUser({ uuid: user.id, year: e.target.value }))
    }
    const selectTileTypeHandler = (e) => {
        dispatch(setTileType(e.target.value))
    }

    return (
        <div className='weekdays_container'>
            <select id="year_select" onChange={selectHandler} value={year}>
                {
                    [...Array(2200 - 1950).keys().map(i => 1950 + i)].map(y => <option key={y} value={y}>{y}</option>)
                }
            </select>
            <select id="tile_type_select" onChange={selectTileTypeHandler} value={tileType}>
                {
                    TILE_ITEMS.map(({value, name}) => <option key={value} value={value}>{name}</option>)
                }
            </select>
            <button onClick={() => dispatch(setActive())}>PARAMETERS</button>
            <div className="weekdays">
                {['  ', ...WEEKDAYS].map(d => <span key={d}>{d}</span>)}
            </div>
        </div>
    )
}

export default WeekdaysContainer