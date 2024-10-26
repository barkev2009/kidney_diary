import React, { useEffect } from 'react'
import { date2String, getDateByYearWeekDay, getDateWeek } from '../utils/date'
import Tile from '../components/Tile'

const TileContainer = ({ year }) => {

    useEffect(
        () => {
            setTimeout(
                () => {
                    const currentDate = document.getElementById(date2String(new Date()));
                    currentDate && currentDate.scrollIntoView({ behavior: 'smooth', block: 'center'});
                }, 100
            );
        }, []
    );

    return (
        <div className='tile_container'>
            {[...Array(getDateWeek(new Date(year + '-12-31')) + 1).keys()].map((i, index) => <div key={i} className={`tile_row ${index % 2 !== 0 ? 'even' : ''}`}>
                {
                    [...Array(7).keys()].map(tile => <Tile key={tile} date={getDateByYearWeekDay(year, i, tile)} year={year} />)
                }
            </div>)}
        </div>
    )
}

export default TileContainer