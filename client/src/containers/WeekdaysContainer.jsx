import React from 'react'
import { WEEKDAYS } from '../constants'

const WeekdaysContainer = ({ setYear }) => {
    return (
        <div className='weekdays_container'>
            <select id="year_select" onChange={e => setYear(e.target.value)}>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
            </select>
            <div className="weekdays">
                {['  ', ...WEEKDAYS].map(d => <span key={d}>{d}</span>)}
            </div>
        </div>
    )
}

export default WeekdaysContainer