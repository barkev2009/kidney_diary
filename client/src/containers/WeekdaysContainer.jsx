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
        dispatch(getByUser({ uuid: user.id, year: e.target.value }));
    };

    const selectTileTypeHandler = (e) => {
        dispatch(setTileType(e.target.value));
    };

    // Разумный диапазон годов: 10 лет назад — 1 год вперёд
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 12 }, (_, i) => currentYear - 10 + i);

    return (
        <div className='weekdays_container'>
            <div className='toolbar'>
                {/* FIX: диапазон годов ограничен разумными значениями (было 1950–2200 = 250 элементов) */}
                <select className='toolbar_select' id="year_select" onChange={selectHandler} value={year}>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <select className='toolbar_select' id="tile_type_select" onChange={selectTileTypeHandler} value={tileType}>
                    {TILE_ITEMS.map(({ value, name }) => <option key={value} value={value}>{name}</option>)}
                </select>
                <button className='btn btn_secondary' onClick={() => dispatch(setActive())}>⚙ Параметры</button>
            </div>
            <div className="weekdays">
                {['', ...WEEKDAYS].map((d, i) => <span key={i}>{d}</span>)}
            </div>
        </div>
    )
}

export default WeekdaysContainer
