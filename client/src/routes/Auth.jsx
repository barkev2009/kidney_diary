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
    // FIX: passVisible теперь работает — добавлен сеттер
    const [passVisible, setPassVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = location.pathname === AUTH_ROUTE;

    const logIn = async () => {
        if (!login || !password) {
            setError('Заполните все поля');
            return;
        }
        try {
            setLoading(true);
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
            setError(error.response?.data?.message ?? 'Неизвестная ошибка');
        } finally {
            setLoading(false);
        }
    };

    // FIX: поддержка Enter для отправки формы
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') logIn();
    };

    return (
        <div className='auth_container'>
            <div className='auth_form'>
                <h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                {error && <div className='auth_error'>{`⚠ ${error}`}</div>}
                {!isLogin && (
                    <div className='input_group'>
                        <label htmlFor="name_input">Имя</label>
                        <input
                            type="text"
                            placeholder='Введите имя...'
                            id="name_input"
                            onChange={e => setName(e.target.value)}
                            value={name}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                )}
                <div className='input_group'>
                    <label htmlFor="login_input">Логин</label>
                    <input
                        type="text"
                        placeholder='Введите логин...'
                        id="login_input"
                        onChange={e => setLogin(e.target.value)}
                        value={login}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className='input_group'>
                    <label htmlFor="password_input">Пароль</label>
                    <div className='password_wrapper'>
                        {/* FIX: passVisible теперь реально переключает видимость */}
                        <input
                            type={passVisible ? "text" : "password"}
                            placeholder='Введите пароль...'
                            id="password_input"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            type="button"
                            className='toggle_pass'
                            onClick={() => setPassVisible(v => !v)}
                            tabIndex={-1}
                        >
                            {passVisible ? '🙈' : '👁'}
                        </button>
                    </div>
                </div>
                <div className='auth_link'>
                    {isLogin
                        ? <span>Нет аккаунта? <NavLink to={REGISTER_ROUTE}>Зарегистрируйся!</NavLink></span>
                        : <span>Есть аккаунт? <NavLink to={AUTH_ROUTE}>Авторизуйся!</NavLink></span>
                    }
                </div>
                <button
                    type="button"
                    onClick={logIn}
                    disabled={loading}
                    className='auth_submit'
                >
                    {loading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>
            </div>
            <div className="background_sector" />
        </div>
    )
}

export default Auth
