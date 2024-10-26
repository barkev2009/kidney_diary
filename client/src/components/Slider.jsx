import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AUTH_ROUTE } from '../constants';
import { setIsAuth } from '../reducers/user';

const Slider = ({ active, sliderToggler }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const item = useSelector(state => state.item.data);

    const logOutHandler = () => {
        navigate(AUTH_ROUTE);
        dispatch(setIsAuth(false));
    }

    return (
        <div className={`slider_container ${active && 'active'}`}>
            <button onClick={sliderToggler}>BACK</button>
            <button onClick={logOutHandler}>TO AUTH</button>
            <pre>
                {JSON.stringify(item, null, 2)}
            </pre>
        </div>
    )
}

export default Slider