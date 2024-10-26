import React, { useState } from 'react';
import { useSetCookie } from '../hooks';
import { MONTHS, WEEKDAYS } from '../constants';
import Slider from '../components/Slider';
import { getDateByYearWeekDay, getDateWeek } from '../utils/date';
import Tile from '../components/Tile';

const Main = () => {

    useSetCookie();
    const [active, setActive] = useState(false);
    const [year, setYear] = useState(2023);
    const sliderToggler = (e) => {
        setActive(prev => !prev);
    }

    return (
        <div className='main_container'>
            <div className='weekdays_container'>
                <select id="year_select" onChange={e => setYear(e.target.value)}>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                </select>
                <div className="weekdays">
                    {['  ', ...WEEKDAYS].map(d => <span key={d}>{d}</span>)}
                </div>
            </div>
            <Slider active={active} sliderToggler={sliderToggler} />
            <div className='tile_container'>
                {[...Array(getDateWeek(new Date(year + '-12-31')) + 1).keys()].map(i => <div key={i} className='tile_row'>
                    {
                        [...Array(7).keys()].map(tile => <Tile key={tile} setActive={setActive} date={getDateByYearWeekDay(year, i, tile)} year={year} />)
                    }
                </div>)}
            </div>
            <div className='month_container'>
                {MONTHS.map(m => <div className='month' key={m}>{m}</div>)}
            </div>
        </div>
    )
}

export default Main