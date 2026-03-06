import React, { useEffect } from 'react'
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

    // Блокируем скролл страницы когда слайдер открыт на мобиле
    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (isActive && isMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isActive]);

    const logOutHandler = () => {
        navigate(AUTH_ROUTE);
        dispatch(setIsAuth(false));
    };

    const closeSlider = () => {
        dispatch(clearItem());
        dispatch(getByUser({ uuid: user.id, year }));
    };

    const backdropClick = (e) => {
        if (e.target === e.currentTarget) closeSlider();
    };

    return (
        <>
            {isActive && <div className='slider_backdrop' onClick={backdropClick} />}

            <div className={`slider_container ${isActive ? 'active' : ''}`}>
                <div className='slider_header'>
                    <button className='btn btn_secondary slider_back_btn' onClick={closeSlider}>
                        ← Назад
                    </button>
                    <span className='slider_date_label'>
                        {isActive ? new Date(item.date).toLocaleDateString('ru-RU', {
                            day: 'numeric', month: 'long', year: 'numeric'
                        }) : ''}
                    </span>
                    <button className='btn btn_danger' onClick={logOutHandler}>Выйти</button>
                </div>

                {isActive
                    ? <ItemContainer />
                    : <div className='slider_empty'>
                        <div className='slider_empty_icon'>📅</div>
                        <div>Выберите день в календаре</div>
                      </div>
                }
            </div>
        </>
    );
};

export default Slider;
