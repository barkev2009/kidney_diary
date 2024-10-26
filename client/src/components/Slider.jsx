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

    const logOutHandler = () => {
        navigate(AUTH_ROUTE);
        dispatch(setIsAuth(false));
    }
    const closeSlider = () => {
        dispatch(clearItem());
        dispatch(getByUser({ uuid: user.id, year }));
    }

    return (
        <div className={`slider_container ${Object.keys(item).length !== 0 && 'active'}`}>
            <button onClick={closeSlider}>BACK</button>
            <button onClick={logOutHandler}>TO AUTH</button>
            <ItemContainer />
        </div>
    )
}

export default Slider