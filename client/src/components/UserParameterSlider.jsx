import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createParam, setActive } from '../reducers/userParameter';
import { SELECT_ITEMS } from '../constants';

const UserParameterSlider = () => {

    const active = useSelector(state => state.userParameter.active);
    const user = useSelector(state => state.user.user);
    const userParameters = useSelector(state => state.userParameter.data);
    const dispatch = useDispatch();

    const [limit_min, set_limit_min] = useState(0);
    const [limit_max, set_limit_max] = useState(0);
    const [rating, set_rating] = useState(0);
    const [type, setType] = useState('water');

    const changeHandler = (type) => {
        return (e) => {
            switch (type) {
                case 'limit_max':
                    set_limit_max(e.target.value);
                    break;
                case 'limit_min':
                    set_limit_min(e.target.value);
                    break;
                case 'rating':
                    set_rating(e.target.value);
                    break;
            }
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createParam({ uuid: user.id, limit_min, limit_max, rating, type }));
        set_limit_min(0);
        set_limit_max(0);
        set_rating(0);
    }

    return (
        <div className={`slider_container ${active && 'active'}`}>
            <button onClick={() => dispatch(setActive())}>BACK</button>
            <select style={{ transition: 'all 0s' }} onChange={e => setType(e.target.value)}>
                {
                    SELECT_ITEMS.map(({ value, name }) => <option key={value} value={value}>{name}</option>)
                }
            </select>
            <form onSubmit={submitHandler}>
                <div>
                    <div>Минимальное значение</div>
                    <input type="number" value={limit_min} onChange={changeHandler('limit_min')} />
                </div>
                <div>
                    <div>Максимальное значение</div>
                    <input type="number" value={limit_max} onChange={changeHandler('limit_max')} />
                </div>
                <div>
                    <div>Рейтинг</div>
                    <input type="number" value={rating} onChange={changeHandler('rating')} />
                </div>
                <button type="submit">CREATE</button>
            </form>
            <pre>
                {JSON.stringify(userParameters, null, 2)}
            </pre>
        </div>
    )
}

export default UserParameterSlider