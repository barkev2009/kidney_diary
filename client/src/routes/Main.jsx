import React from 'react'
import { useSetCookie } from '../hooks'
import { useNavigate } from 'react-router-dom';
import { AUTH_ROUTE } from '../constants';

const Main = () => {

    useSetCookie();
    const navigate = useNavigate();

    return (
        <div>Main
            <button onClick={() => navigate(AUTH_ROUTE)}>TO AUTH</button>
        </div>
    )
}

export default Main