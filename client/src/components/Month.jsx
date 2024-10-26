import React, { useEffect, useState } from 'react'
import { date2String } from '../utils/date'
import { useWindowSize } from '../hooks';

const Month = ({ month, year, monthName }) => {

    const [height, setHeight] = useState(0);
    setTimeout(
        () => {
            const firstDate = new Date(year, month, 1);
            const lastDate = new Date(year, month + 1, 1).addDays(-1);
            const first = document.getElementById(date2String(firstDate));
            const last = document.getElementById(date2String(lastDate));
            setHeight(
                (lastDate.getDay() === 0 || month === 11)
                    ? last.getBoundingClientRect().bottom - first.getBoundingClientRect().top
                    : last.getBoundingClientRect().top - first.getBoundingClientRect().top
            );
        }, 50
    );

    useWindowSize();

    if (height !== 0) {
        return (
            <div id={month} style={{ height: `${height}px` }} className={`month ${month % 2 !== 0 ? 'even' : ''}`} >{monthName}</div>
        )
    }
    return (
        <div className='month' >{monthName}</div>
    )
}

export default Month