import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AUTH_ROUTE } from '../constants';
import { setIsAuth } from '../reducers/user';
import { clearItem, getByUser } from '../reducers/item';
import ItemContainer from '../containers/ItemContainer';

const Slider = ({ year }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const item = useSelector(state => state.item.data);
    const user = useSelector(state => state.user.user);

    const isActive = Object.keys(item).length !== 0;

    const logOutHandler = () => {
        navigate(AUTH_ROUTE);
        dispatch(setIsAuth(false));
    };
    const closeSlider = () => {
        dispatch(clearItem());
        dispatch(getByUser({ uuid: user.id, year }));
    };

    // FIX: закрытие по клику на фон (backdrop)
    const backdropClick = (e) => {
        if (e.target === e.currentTarget) closeSlider();
    };

    return (
        <>
            {/* FIX: затемнённый фон — клик по нему закрывает слайдер */}
            {isActive && <div className='slider_backdrop' onClick={backdropClick} />}
            <div className={`slider_container ${isActive ? 'active' : ''}`}>
                <div className='slider_header'>
                    <button className='btn btn_secondary' onClick={closeSlider}>← Назад</button>
                    <button className='btn btn_danger' onClick={logOutHandler}>Выйти</button>
                </div>
                <ItemContainer />
            </div>
        </>
    )
}

export default Slider
