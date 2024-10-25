import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AUTH_ROUTE } from '../constants';
import { setIsAuth } from '../reducers/user';

const Slider = ({ active, sliderToggler }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOutHandler = () => {
        navigate(AUTH_ROUTE);
        dispatch(setIsAuth(false));
    }

    return (
        <div className={`slider_container ${active && 'active'}`}>
            <button onClick={sliderToggler}>BACK</button>
            <button onClick={logOutHandler}>TO AUTH</button>
        </div>
    )
}

export default Slider