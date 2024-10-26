import React, { useEffect, useState } from 'react';
import { useSetCookie } from '../hooks';
import Slider from '../components/Slider';
import WeekdaysContainer from '../containers/WeekdaysContainer';
import TileContainer from '../containers/TileContainer';
import MonthContainer from '../containers/MonthContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getByUser } from '../reducers/item';

const Main = () => {

    useSetCookie();
    const [year, setYear] = useState(new Date().getFullYear());
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    useEffect(
        () => {
            if (user.id) {
                dispatch(getByUser({ uuid: user.id, year }));
            }
        }, [user]
    );

    return (
        <div className='main_container'>
            <WeekdaysContainer year={year} setYear={setYear} />
            <Slider year={year} />
            <TileContainer year={year} />
            <MonthContainer year={year} />
        </div>
    )
}

export default Main