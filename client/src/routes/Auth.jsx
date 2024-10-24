import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AUTH_ROUTE, MAIN_ROUTE, REGISTER_ROUTE } from '../constants';
import { loginAPI, register } from '../api/user';
import { setIsAuth, setUser } from '../reducers/user';

const Auth = () => {

    const [login, setLogin] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [passVisible,] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = location.pathname === AUTH_ROUTE;

    const logIn = async () => {
        try {
            let user;
            if (isLogin) {
                user = await loginAPI(login, password);
            } else {
                user = await register(login, password, name);
            }
            dispatch(setUser(user));
            dispatch(setIsAuth(true));
            setError(null);
            navigate(MAIN_ROUTE.replace(':id', user.id));
        } catch (error) {
            setError(error.response.data.message);
        }

    }

    return (
        <div className='auth_container'>
            <div className='auth_form'>
                {error && <div  >{`Ошибка: ${error}`}</div>}
                <h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                {
                    !isLogin && <div >
                        <input type="text" placeholder='Введите имя...' className="form-control mt-4" id="name_input" onChange={e => setName(e.target.value)} value={name} />
                    </div>
                }
                <div >
                    <input type="text" placeholder='Введите логин...' className="form-control mt-4" id="login_input" onChange={e => setLogin(e.target.value)} value={login} />
                </div>
                <div >
                    <input type={passVisible ? "text" : "password"} placeholder='Введите пароль...' className="form-control mt-4" id="password_input" onChange={e => setPassword(e.target.value)} value={password} />
                </div>
                <div className='mt-3'>
                    {
                        isLogin ? <div >Нет аккаунта? <NavLink to={REGISTER_ROUTE}>Зарегистрируйся!</NavLink></div>
                            : <div >Есть аккаунт? <NavLink to={AUTH_ROUTE}>Авторизуйся!</NavLink></div>
                    }
                </div>
                <button type="button" className="btn btn-outline-primary" onClick={logIn} >{isLogin ? 'Войти' : 'Регистрация'}</button>
            </div>
            <div className="background_sector" />
        </div>
    )
}

export default Auth