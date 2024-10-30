import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createParam, setActive } from '../reducers/userParameter';

const UserParameterSlider = () => {

    const active = useSelector(state => state.userParameter.active);
    const user = useSelector(state => state.user.user);
    const userParameters = useSelector(state => state.userParameter.data);
    const dispatch = useDispatch();

    const [limit_min, set_limit_min] = useState(0);
    const [limit_max, set_limit_max] = useState(0);
    const [rating, set_rating] = useState(0);

    const submitHandler = (type) => {
        return (e) => {
            e.preventDefault();
            dispatch(createParam({ uuid: user.id, limit_min, limit_max, rating, type }));
            set_limit_min(0);
            set_limit_max(0);
            set_rating(0);
        }
    }

    return (
        <div className={`slider_container ${active && 'active'}`}>
            <button onClick={() => dispatch(setActive())}>BACK</button>
            <form onSubmit={submitHandler('water')}>
                <div>
                    <div>water min</div>
                    <input type="number" value={limit_min} onChange={e => set_limit_min(e.target.value)} />
                </div>
                <div>
                    <div>water max</div>
                    <input type="number" value={limit_max} onChange={e => set_limit_max(e.target.value)} />
                </div>
                <div>
                    <div>water rating</div>
                    <input type="number" value={rating} onChange={e => set_rating(e.target.value)} />
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