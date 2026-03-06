import React, { useEffect, useState } from 'react';
import { useSetCookie } from '../hooks';
import Slider from '../components/Slider';
import WeekdaysContainer from '../containers/WeekdaysContainer';
import TileContainer from '../containers/TileContainer';
import MonthContainer from '../containers/MonthContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getByUser } from '../reducers/item';
import { getParamsByUser } from '../reducers/userParameter';
import UserParameterSlider from '../components/UserParameterSlider';

const Main = () => {

    useSetCookie();
    const [year, setYear] = useState(new Date().getFullYear());
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    useEffect(
        () => {
            if (user.id) {
                dispatch(getByUser({ uuid: user.id, year }));
                dispatch(getParamsByUser({ uuid: user.id }));
            }
        }, [user.id] // eslint-disable-line react-hooks/exhaustive-deps
    );

    return (
        <div className='main_container'>
            {/* Левая колонка: календарь */}
            <div className='calendar_column'>
                <WeekdaysContainer year={year} setYear={setYear} />
                <TileContainer year={year} />
                <MonthContainer year={year} />
            </div>

            {/* Правая колонка: панель дня + параметры.
                На мобиле — оверлей, на десктопе — постоянная боковая панель */}
            <Slider year={year} />
            <UserParameterSlider />
        </div>
    );
};

export default Main;
