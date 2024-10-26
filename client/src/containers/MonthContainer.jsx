import React from 'react'
import Month from '../components/Month'
import { MONTHS } from '../constants'

const MonthContainer = ({year}) => {
    return (
        <div className='month_container'>
            {MONTHS.map((m, index) => <Month key={m} month={index} year={year} monthName={m} />)}
        </div>
    )
}

export default MonthContainer