import React from 'react'
import { useSetCookie } from '../hooks'
import { useNavigate } from 'react-router-dom';
import { AUTH_ROUTE, WEEKDAYS } from '../constants';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '../reducers/user';

const Main = () => {

    useSetCookie();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOutHandler = () => {
        navigate(AUTH_ROUTE);
        dispatch(setIsAuth(false));
    }

    return (
        <div className='main_container'>
            <div className="weekdays">
                {['  ', ...WEEKDAYS].map(d => <span key={d}>{d}</span>)}
            </div>
            {/* <div className='tile_container'>
                {[...Array(1000).keys()].map(i => <div key={i} className='tile'>{i}</div>)}
            </div> */}
            <div className='tile_container'>
                {[...Array(100).keys()].map(i => <div key={i} className='tile_row'>
                    {
                        [...Array(7).keys()].map(tile => <div key={tile} className='tile'>{tile}</div>)
                    }
                </div>)}
            </div>

            <button onClick={logOutHandler}>TO AUTH</button>
        </div>
    )
}

export default Main