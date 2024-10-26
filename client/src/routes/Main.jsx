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
    const [year, setYear] = useState(2023);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    useEffect(
        () => {
            if (user.id) {
                dispatch(getByUser({ uuid: user.id }));
            }
        }, [user]
    );

    return (
        <div className='main_container'>
            <WeekdaysContainer setYear={setYear} />
            <Slider />
            <TileContainer year={year} />
            <MonthContainer year={year} />
        </div>
    )
}

export default Main