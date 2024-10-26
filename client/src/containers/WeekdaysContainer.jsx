import React from 'react'
import { WEEKDAYS } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { getByUser } from '../reducers/item';

const WeekdaysContainer = ({ setYear, year }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const selectHandler = (e) => {
        setYear(e.target.value);
        dispatch(getByUser({ uuid: user.id, year: e.target.value }))
    }

    return (
        <div className='weekdays_container'>
            <select id="year_select" onChange={selectHandler} value={year}>
                {
                    [...Array(2200 - 1950).keys().map(i => 1950 + i)].map(y => <option key={y} value={y}>{y}</option>)
                }
            </select>
            <div className="weekdays">
                {['  ', ...WEEKDAYS].map(d => <span key={d}>{d}</span>)}
            </div>
        </div>
    )
}

export default WeekdaysContainer